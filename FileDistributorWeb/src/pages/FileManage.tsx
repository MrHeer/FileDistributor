import React, { FC, useEffect, useState, ReactText } from "react";
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
  useIntl,
  connect,
  ConnectProps,
  Dispatch,
} from "umi";
import { stringify } from "qs";
import {
  File as FileModel,
  Host,
  Host as HostModel,
  Status,
} from "@/models/interface";
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

const { confirm } = Modal;

interface FileManageProps extends ConnectProps {
  fileData: FileModel[];
  hostData: HostModel[];
  loading?: boolean;
  dispatch: Dispatch;
}

const FileManage: FC<FileManageProps> = (props) => {
  const { fileData, hostData = [], loading = true, dispatch } = props;

  const [selectedFileKeys, setSelectedFileKeys] = useState<ReactText[]>([]);
  const [hostId, setHostId] = useState("");
  const [remotePath, setRemotePath] = useState("");
  const [keyword, setKeyword] = useState("");

  const { formatMessage } = useIntl();

  const onQueryHost = () => {
    dispatch({
      type: "hostData/fetch",
      callback: (hosts: Host[]) => {
        if (hosts.length > 0) {
          setHostId(hosts[0].key);
        }
      },
    });
  };

  const onQueryFile = (data: {
    hostId: string;
    remotePath: string;
    keyword: string;
  }) => {
    dispatch({
      type: "fileData/fetch",
      payload: data,
    });
  };

  const onDeleteFile = (data: {
    hostId: string;
    remotePath: string;
    keyword: string;
    files: ReactText[];
  }) => {
    dispatch({
      type: "fileData/delete",
      payload: data,
      callback: (status: Status) => {
        if (status === "success") {
          message.success(formatMessage({ id: "delete_success" }));
        } else if (status === "error") {
          message.error(formatMessage({ id: "delete_error" }));
        }
      },
    });
  };

  const onSelectChange = (selectedRowKeys: React.ReactText[]) => {
    setSelectedFileKeys(selectedRowKeys);
  };

  // query file data
  const handleFilesQuery = () => {
    const data = {
      hostId: hostId,
      remotePath: remotePath,
      keyword: keyword,
    };
    onQueryFile(data);
  };

  const handleSelectChange = (value: string) => {
    setHostId(value);
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
      hostId: hostId,
      remotePath: newPath,
      keyword: keyword,
    };
    onQueryFile(data);
    setRemotePath(newPath);
  };

  // delete you selected rows
  const onClickDelete = () => {
    const data = {
      hostId,
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
      hostId,
      keyword,
      remotePath,
      files: [record.name],
    };
    onDeleteFile(data);
  };

  const onClickBack = () => {
    let newPaths = remotePath.split("/");
    newPaths.pop();
    let newPath = newPaths.join("/");
    newPath = newPath.replace("//", "/");
    const data = {
      hostId: hostId,
      remotePath: newPath,
      keyword: keyword,
    };
    onQueryFile(data);
    setRemotePath(newPath);
  };

  useEffect(() => {
    onQueryHost();
  }, []);

  const fileListProps: TableProps<FileModel> = {
    pagination: {
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100", "300", "500"],
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
          hostId: hostId,
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
      dataIndex: "size",
    },
    {
      title: formatMessage({ id: "modify_time" }),
      key: "modifyTime",
      dataIndex: "modifyTime",
    },
    {
      title: formatMessage({ id: "action" }),
      key: "action",
      width: 120,
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
    <Spin spinning={loading}>
      <Row gutter={10} style={{ margin: 20 }}>
        <Col span={20}>
          <Row gutter={10}>
            <Col span={8}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={formatMessage({ id: "chose_host" })}
                onChange={handleSelectChange}
                value={hostId}
                options={hostData.map((host) => ({
                  key: host.key,
                  value: host.key,
                  label: host.hostName,
                }))}
                filterOption={(input, option) => {
                  if (option && option.label) {
                    return (
                      option.label
                        .toString()
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    );
                  }
                  return true;
                }}
              ></Select>
            </Col>
            <Col span={8}>
              <Input
                value={remotePath}
                onChange={handleRemotePathChange}
                placeholder={formatMessage({ id: "remote_path" })}
                allowClear
              />
            </Col>
            <Col span={8}>
              <Input
                onChange={handleKeywordChange}
                placeholder={formatMessage({ id: "keyword" })}
                allowClear
              />
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row justify="end">
            <Col>
              <Button onClick={handleFilesQuery}>
                <ReloadOutlined />
                <FormattedMessage id="reload" />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={10} style={{ margin: 20 }}>
        <Col>
          <Button onClick={onClickBack} style={{ width: 100 }}>
            <RollbackOutlined />
            <FormattedMessage id="back" />
          </Button>
        </Col>
        <Col>
          <Button
            onClick={onClickDelete}
            style={{ width: 100 }}
            type="primary"
            danger
          >
            <MinusCircleOutlined />
            <FormattedMessage id="delete" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table<FileModel>
            {...fileListProps}
            style={{ height: "100%" }}
            columns={columns}
            dataSource={fileData}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default connect(
  ({
    hostData: { hostData },
    fileData: { fileData },
    loading: { global },
  }: ConnectState) => ({
    fileData,
    hostData,
    loading: global,
  })
)(FileManage);
