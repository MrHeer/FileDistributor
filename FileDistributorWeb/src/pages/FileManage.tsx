import React, { SFC, useEffect, useState, ReactText } from "react";
import {
  Table,
  Select,
  Input,
  Row,
  Col,
  Button,
  Popconfirm,
  Modal,
  Spin,
  message,
} from "antd";
import {
  FormattedMessage,
  formatMessage,
  connect,
  ConnectProps,
  Dispatch,
} from "umi";
import { stringify } from "qs";
import { File as FileModel, Host as HostModel } from "@/models/interface";
import { ConnectState } from "@/models/connect";
import { TableProps, ColumnsType } from "antd/lib/table/Table";
import {
  FileOutlined,
  FolderOutlined,
  FileUnknownOutlined,
  ReloadOutlined,
  MinusCircleOutlined,
  RollbackOutlined,
} from "@ant-design/icons";

const Option = Select.Option;
const { confirm } = Modal;

interface FileManageProps extends ConnectProps {
  fileData: FileModel[];
  hostData: HostModel[];
  loading?: boolean;
  dispatch: Dispatch;
}

const FileManage: SFC<FileManageProps> = (props) => {
  const { fileData, hostData, loading = true, dispatch } = props;

  const [selectedFileKeys, setSelectedFileKeys] = useState<ReactText[]>([]);
  const [hostID, setHostID] = useState("");
  const [remotePath, setRemotePath] = useState("");
  const [keyword, setKeyword] = useState("");

  const onQueryHost = () => {
    dispatch({
      type: "hostData/fetch",
    });
  };

  const onQueryFile = (data: {
    hostID: string;
    remotePath: string;
    keyword: string;
  }) => {
    dispatch({
      type: "fileData/fetch",
      payload: data,
    });
  };

  const onDeleteFile = (data: {
    hostID: string;
    remotePath: string;
    keyword: string;
    files: ReactText[];
  }) => {
    dispatch({
      type: "fileData/delete",
      payload: data,
    });
  };

  const onSelectChange = (selectedRowKeys: React.ReactText[]) => {
    setSelectedFileKeys(selectedRowKeys);
  };

  const onShowSizeChange = (current: number, pageSize: number) => {};

  // query file data
  const handleQuery = () => {
    const data = {
      hostID: hostID,
      remotePath: remotePath,
      keyword: keyword,
    };
    onQueryFile(data);
  };

  const handleSelectChange = (value: string) => {
    setHostID(value);
  };

  const handleRemotePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRemotePath(e.target.value);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleChangePath = (record: FileModel) => {
    var newPath = `${remotePath}/${record.name}`;
    newPath = newPath.replace("//", "/");
    const data = {
      hostID: hostID,
      remotePath: newPath,
      keyword: keyword,
    };
    onQueryFile(data);
    setRemotePath(newPath);
  };

  // delete you selected rows
  const onClickDelete = () => {
    const data = {
      hostID,
      remotePath,
      keyword,
      files: selectedFileKeys,
    };
    if (data.files.length > 0) {
      confirm({
        title: formatMessage({ id: "file_confirm_title" }),
        content: formatMessage({ id: "total" }) + data.files.length,
        okText: formatMessage({ id: "yes" }),
        okType: "danger",
        cancelText: formatMessage({ id: "no" }),
        onOk: () => onDeleteFile(data),
      });
    } else {
      message.error(formatMessage({ id: "no_checked" }));
    }
  };

  // delete one row
  const handleDelete = (record: FileModel) => {
    const data = {
      hostID,
      keyword,
      remotePath,
      files: [record.name],
    };
    onDeleteFile(data);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.localName === "input") {
      return;
    }
    switch (e.keyCode) {
      // Backspace
      case 8:
        onClickBack();
        break;
    }
  };

  const onClickBack = () => {
    let newPaths = remotePath.split("/");
    newPaths.pop();
    let newPath = newPaths.join("/");
    newPath = newPath.replace("//", "/");
    const data = {
      hostID: hostID,
      remotePath: newPath,
      keyword: keyword,
    };
    onQueryFile(data);
    setRemotePath(newPath);
  };

  useEffect(() => {
    onQueryHost();
  });

  const onPageChange = (pageNumber: number) => {};

  const fileListProps: TableProps<FileModel> = {
    pagination: {
      showQuickJumper: true,
      showSizeChanger: true,
      onShowSizeChange: onShowSizeChange,
      pageSizeOptions: ["10", "20", "50", "100", "300", "500"],
      onChange: onPageChange,
      showTotal: (total, range) => `${range[0]}-${range[1]}, ${total}`,
    },
    rowSelection: {
      onChange: onSelectChange,
    },
  };

  const columns: ColumnsType<FileModel> = [
    {
      title: formatMessage({ id: "file_name" }),
      key: "name",
      sorter: (a, b) => (a.groupName > b.groupName ? 1 : -1),
      width: 450,
      render: (_text, record) => {
        const params = {
          hostID: hostID,
          remotePath: remotePath,
          fileName: record.name,
        };
        if (record.type === "-") {
          return (
            <a
              href={`/api/download?${stringify(params)}`}
              download={record.name}
            >
              <FileOutlined style={{ marginRight: "1em" }} />
              {record.name}
            </a>
          );
        } else if (record.type === "d") {
          return (
            <a onClick={() => handleChangePath(record)}>
              <FolderOutlined style={{ marginRight: "1em" }} />
              {record.name}
            </a>
          );
        } else {
          return (
            <a
              href={`/api/download?${stringify(params)}`}
              download={record.name}
            >
              <FileUnknownOutlined style={{ marginRight: "1em" }} />
              {record.name}
            </a>
          );
        }
      },
    },
    {
      title: formatMessage({ id: "file_size" }),
      key: "size",
      width: 250,
    },
    {
      title: formatMessage({ id: "modify_time" }),
      key: "modifyTime",
      width: 400,
    },
    {
      title: formatMessage({ id: "action" }),
      key: "action",
      width: 160,
      render: (_text, record) => (
        <span>
          <Popconfirm
            title={formatMessage({ id: "pop_confirm_title" })}
            onConfirm={() => handleDelete(record)}
          >
            <a>
              <FormattedMessage id="delete" />
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div onKeyPress={onKeyPress}>
      <Spin spinning={loading}>
        <Row gutter={10} style={{ margin: 20 }}>
          <Col span={5}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder={formatMessage({ id: "chose_host" })}
              onChange={handleSelectChange}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {hostData.map((host) => (
                <Option key={host.key} value={host.key}>
                  {host.hostName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={5}>
            <Input
              value={remotePath}
              onChange={handleRemotePathChange}
              placeholder={formatMessage({ id: "remote_path" })}
              allowClear
            />
          </Col>
          <Col span={5}>
            <Input
              onChange={handleKeywordChange}
              placeholder={formatMessage({ id: "keyword" })}
              allowClear
            />
          </Col>
          <Col span={2}>
            <Button onClick={handleQuery}>
              <ReloadOutlined />
              <FormattedMessage id="reload" />
            </Button>
          </Col>
        </Row>
        <Row gutter={10} style={{ margin: 20 }}>
          <Col span={2}>
            <Button onClick={onClickBack}>
              <RollbackOutlined />
              <FormattedMessage id="back" />
            </Button>
          </Col>
          <Col span={2}>
            <Button onClick={onClickDelete} type="primary" danger>
              <MinusCircleOutlined />
              <FormattedMessage id="delete" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table<FileModel>
              {...fileListProps}
              style={{ minHeight: 520 }}
              columns={columns}
              dataSource={fileData}
            />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default connect(
  ({
    treeData: { treeData },
    fileData: { fileData },
    loading: { models },
  }: ConnectState) => ({
    fileData,
    treeData,
    loading: models.fileData,
  })
)(FileManage);
