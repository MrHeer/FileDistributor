import { FC, useState, ReactText, useEffect } from "react";
import {
  Table,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Button,
  Popconfirm,
  Modal,
  Spin,
  message,
} from "antd";
import { FormattedMessage, useIntl, ConnectProps, Dispatch } from "umi";
import { connect } from "dva";
import React from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Host as HostModel, Status } from "@/models/interface";
import { ConnectState } from "@/models/connect";
import { TableProps, ColumnsType } from "antd/lib/table/Table";

const { confirm } = Modal;
const FormItem = Form.Item;

interface FormData {
  hostId?: string;
  groupName: string;
  hostName: string;
  ipAddress: string;
  port: string;
  userName: string;
  password: string;
}

interface FormProps {
  visible: boolean;
  onCancel: () => void;
  title: string;
  onOk: (values: FormData) => void;
  formData: FormData;
  onTest: (values: FormData) => void;
}

const ModalForm: FC<FormProps> = (props) => {
  const [form] = Form.useForm<FormData>();
  const { formatMessage } = useIntl();
  const { visible, title, onOk, onCancel, formData, onTest } = props;
  form.setFieldsValue(formData);
  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOk(({
              ...values,
              hostId: formData.hostId,
            } as unknown) as FormData);
          })
          .catch((info) => {
            message.error(formatMessage({ id: "fill_form" }));
            console.error(info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <FormItem
          name="groupName"
          label={formatMessage({ id: "group_name" })}
          initialValue={formData.groupName}
          rules={[
            {
              required: true,
              message: formatMessage({ id: "group_name_message" }),
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="hostName"
          label={formatMessage({ id: "host_name" })}
          initialValue={formData.hostName}
          rules={[
            {
              required: true,
              message: formatMessage({ id: "host_name_message" }),
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="ipAddress"
          label={formatMessage({ id: "ip_address" })}
          initialValue={formData.ipAddress}
          rules={[
            {
              required: true,
              message: formatMessage({ id: "ip_address_message" }),
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="port"
          label={formatMessage({ id: "port" })}
          initialValue={formData.port}
          rules={[
            {
              required: true,
              message: formatMessage({ id: "port_message" }),
            },
          ]}
        >
          <Input type="number" />
        </FormItem>
        <FormItem
          name="userName"
          label={formatMessage({ id: "user_name" })}
          initialValue={formData.userName}
          rules={[
            {
              required: true,
              message: formatMessage({ id: "user_name_message" }),
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="password"
          label={formatMessage({ id: "password" })}
          initialValue={formData.password}
          rules={[
            {
              required: true,
              message: formatMessage({ id: "password_message" }),
            },
          ]}
        >
          <Input type="password" />
        </FormItem>
        <Button
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onTest(({
                  ...values,
                  hostId: formData.hostId,
                } as unknown) as FormData);
              })
              .catch((info) => {
                message.error(formatMessage({ id: "fill_form" }));
                console.error(info);
              });
          }}
        >
          <FormattedMessage id="test" />
        </Button>
      </Form>
    </Modal>
  );
};

interface HostManageProps extends ConnectProps {
  hostData: HostModel[];
  loading?: boolean;
  dispatch: Dispatch;
}

const HostManage: FC<HostManageProps> = (props) => {
  const { formatMessage } = useIntl();

  const { hostData, loading, dispatch } = props;
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(formatMessage({ id: "add" }));
  const [selectedRowKeys, setSelectedRowKeys] = useState<ReactText[]>([]);
  const [formData, setFormData] = useState<FormData>({
    hostId: "",
    groupName: "",
    hostName: "",
    ipAddress: "",
    port: "22",
    userName: "",
    password: "",
  });

  const onQueryHost = () => {
    dispatch({
      type: "hostData/fetch",
    });
  };

  const onAddHost = (data: FormData) => {
    dispatch({
      type: "hostData/add",
      payload: data,
      callback: (status: Status) => {
        if (status === "success") {
          message.success(formatMessage({ id: "add_success" }));
        } else if (status === "error") {
          message.error(formatMessage({ id: "add_error" }));
        }
      },
    });
  };

  const onDeleteHost = (data: ReactText[]) => {
    dispatch({
      type: "hostData/delete",
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

  const onEditHost = (data: FormData) => {
    dispatch({
      type: "hostData/edit",
      payload: data,
      callback: (status: Status) => {
        if (status === "success") {
          message.success(formatMessage({ id: "edit_success" }));
        } else if (status === "error") {
          message.error(formatMessage({ id: "edit_error" }));
        }
      },
    });
  };

  const onTestHost = (data: FormData) => {
    dispatch({
      type: "hostData/test",
      payload: data,
      callback: (status: Status) => {
        if (status === "success") {
          message.success(formatMessage({ id: "test_success" }));
        } else if (status === "error") {
          message.error(formatMessage({ id: "test_error" }));
        }
      },
    });
  };

  const tableProps: TableProps<HostModel> = {
    pagination: {
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50", "100", "300", "500"],
      showTotal: (total, range) => `${range[0]}-${range[1]}, ${total}`,
    },
    rowSelection: {
      onChange: (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
      },
    },
  };

  const columns: ColumnsType<HostModel> = [
    {
      title: formatMessage({ id: "group_name" }),
      key: "groupName",
      dataIndex: "groupName",
      sorter: (a, b) => (a.groupName > b.groupName ? 1 : -1),
      width: 350,
    },
    {
      title: formatMessage({ id: "host_name" }),
      key: "hostName",
      dataIndex: "hostName",
      width: 350,
    },
    {
      title: formatMessage({ id: "ip_address" }),
      key: "ipAddress",
      dataIndex: "ipAddress",
      width: 400,
    },
    {
      title: formatMessage({ id: "action" }),
      key: "action",
      width: 160,
      render: (text, record) => (
        <span>
          <Popconfirm
            title={formatMessage({ id: "pop_confirm_title" })}
            onConfirm={() => handleDelete(record.key)}
          >
            <a>
              <FormattedMessage id="delete" />
            </a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => handleEdit(record)}>
            <FormattedMessage id="edit" />
          </a>
        </span>
      ),
    },
  ];

  useEffect(() => {
    onQueryHost();
  }, []);

  const onClickAdd = () => {
    const data = {
      hostId: "",
      groupName: "",
      hostName: "",
      ipAddress: "",
      port: "22",
      userName: "",
      password: "",
    };
    setVisible(true);
    setModalTitle(formatMessage({ id: "add" }));
    setFormData(data);
  };

  // add or edit host
  const handleOk = (data: FormData) => {
    if (data.hostId == "") {
      // add host
      onAddHost(data);
    } else {
      // edit host
      onEditHost(data);
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = (row: HostModel) => {
    const data = {
      hostId: row.key,
      groupName: row.groupName,
      hostName: row.hostName,
      ipAddress: row.ipAddress,
      port: row.port,
      userName: row.userName,
      password: "",
    };
    setVisible(true);
    setModalTitle(formatMessage({ id: "edit" }));
    setFormData(data);
  };

  // delete you selected rows
  const onClickDelete = () => {
    if (selectedRowKeys.length > 0) {
      confirm({
        title: formatMessage({ id: "host_confirm_title" }),
        content: formatMessage({ id: "total" }) + selectedRowKeys.length,
        okText: formatMessage({ id: "yes" }),
        okType: "danger",
        cancelText: formatMessage({ id: "no" }),
        onOk: () => onDeleteHost(selectedRowKeys),
      });
    } else {
      message.error(formatMessage({ id: "no_checked" }));
    }
  };

  // delete one row
  const handleDelete = (key: ReactText) => {
    onDeleteHost([key]);
  };

  const handleTest = (data: FormData) => {
    onTestHost(data);
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={10} style={{ margin: 20 }}>
        <Col>
          <Button onClick={onClickAdd} style={{ width: 100 }}>
            <PlusCircleOutlined />
            <FormattedMessage id="add" />
          </Button>
          <ModalForm
            title={modalTitle}
            visible={visible}
            formData={formData}
            onOk={handleOk}
            onTest={handleTest}
            onCancel={handleCancel}
          ></ModalForm>
        </Col>
        <Col>
          <Button
            onClick={onClickDelete}
            type="primary"
            style={{ width: 100 }}
            danger
          >
            <MinusCircleOutlined />
            <FormattedMessage id="delete" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            {...tableProps}
            style={{ height: "100%" }}
            columns={columns}
            dataSource={hostData}
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default connect(
  ({ hostData: { hostData }, loading: { global } }: ConnectState) => ({
    hostData,
    loading: global,
  })
)(HostManage);
