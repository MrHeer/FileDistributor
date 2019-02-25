import { Component } from 'react';
import {
    Table,
    Form,
    Input,
    Divider,
    Row, Col,
    Button,
    Icon,
    Popconfirm,
    Modal,
    Spin,
    message
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { connect } from 'dva';

const { confirm } = Modal;
const FormItem = Form.Item;

const ModalForm = Form.create({ name: 'form_in_modal' })(
    class extends Component {
        render() {
            const {
                visible, confirmLoading, title, onOk, onCancel, form, formData, onTest
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                  confirmLoading={confirmLoading}
                  visible={visible}
                  title={title}
                  onCancel={() => {
                      onCancel();
                      form.resetFields();
                  }}
                  onOk={() => {
                      // check
                      var fieldsValue = form.getFieldsValue();
                      fieldsValue.host_id = formData.host_id;
                      form.validateFields((errors, values) => {
                          if(errors == null) {
                              onOk(fieldsValue);
                              form.resetFields();
                          } else {
                              message.error(formatMessage({id: 'fill_form'}));
                          }
                      });
                  }}
                  >
                  <Form layout="vertical">
                    <FormItem label={formatMessage({id: 'group_name'})}>
                      {getFieldDecorator('group_name', {
                        initialValue: formData.group_name,
                        rules: [{ required: true, message: formatMessage({id: 'group_name_message'}) }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label={formatMessage({id: 'host_name'})}>
                    {getFieldDecorator('host_name', {
                        initialValue: formData.host_name,
                        rules: [{ required: true, message: formatMessage({id: 'host_name_message'}) }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label={formatMessage({id: 'ip_address'})}>
                      {getFieldDecorator('ip_address', {
                        initialValue: formData.ip_address,
                        rules: [{ required: true, message: formatMessage({id: 'ip_address_message'}) }],
                      })(
                        <Input />
                      )}
                     </FormItem>
                    <FormItem label={formatMessage({id: 'user_name'})}>
                      {getFieldDecorator('user_name', {
                        initialValue: formData.user_name,
                        rules: [{ required: true, message: formatMessage({id: 'user_name_message'}) }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label={formatMessage({id: 'password'})}>
                      {getFieldDecorator('password', {
                        initialValue: formData.password,
                        rules: [{ required: true, message: formatMessage({id: 'password_message'}) }],
                      })(
                        <Input.Password />
                      )}
                    </FormItem>
                    <Button
                      onClick={() => {
                          var fieldsValue = form.getFieldsValue();
                          fieldsValue.host_id = formData.host_id;
                          form.validateFields((errors, values) => {
                              if(errors == null) {
                                  onTest(fieldsValue);
                              } else {
                                  message.error(formatMessage({id: 'fill_form'}));
                              }
                          });
                      }}
                    >
                    <FormattedMessage id='test' />
                    </Button>
                  </Form>
                </Modal>
            );
        }
    }
);

const mapStateToProps = (state) => {
    const { hostData } = state['hostData'];
    return {
        hostData,
        loading: state.loading.global
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: 'hostData/fetch'
            });
        },

        onAddHost: (data) => {
            dispatch({
                type: 'hostData/add',
                payload: data
            });
        },

        onDeleteHost: (data) => {
            dispatch({
                type: 'hostData/delete',
                payload: data
            });
        },

        onEditHost: (data) => {
            dispatch({
                type: 'hostData/edit',
                payload: data
            });
        },

        onTestHost: (data) => {
            dispatch({
                type: 'hostData/test',
                payload: data
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class HostManage extends Component {
    onSelectChange = (selectedRowKeys, selectedRows) => {
        const selectedKeys = [];
        selectedRows.forEach(row => selectedKeys.push(row.key));
        this.setState({
            selectedRowKeys: selectedKeys,
        });
    }

    onShowSizeChange = (current, pageSize) => {
    }

    onPageChange = (pageNumber) => {
    }

    state = {
        visible: false,
        confirmLoading: false,
        modalTitle: formatMessage({id: 'add'}),
        hasData: true,
        selectedRowKeys: [],
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ['10', '20', '50', '100', '300', '500'],
            onChange: this.onPageChange,
            showTotal: (total, range) => `${range[0]}-${range[1]}, ${total}`
        },
        rowSelection: {
            onChange: this.onSelectChange
        },
        formData: {
            host_id: '',
            group_name: '',
            host_name: '',
            ip_address: '',
            user_name: '',
            password: ''
        }
    }

    columns = [{
        title: formatMessage({id: 'group_name'}),
        dataIndex: 'group_name',
        key: 'group_name',
        sorter: (a, b) => a.group_name > b.group_name ? 1 : -1,
        width: 350
    }, {
        title: formatMessage({id: 'host_name'}),
        dataIndex: 'host_name',
        key: 'host_name',
        width: 350,
    }, {
        title: formatMessage({id: 'ip_address'}),
        dataIndex: 'ip_address',
        key: 'ip_address',
        width: 400
    }, {
        title: formatMessage({id: 'action'}),
        key: 'action',
        width: 160,
        render: (text, record) => (
            <span>
              <Popconfirm title={formatMessage({id: 'pop_confirm_title'})} onConfirm={() => this.handleDelete(record.key)}>
                <a><FormattedMessage id='delete' /></a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.handleEdit(record)}><FormattedMessage id='edit' /></a>
            </span>
        )
    }]

    onClickAdd = () => {
        const formData = {
            host_id: '',
            group_name: '',
            host_name: '',
            ip_address: '',
            user_name: '',
            password: ''
        };
        this.setState({
            visible: true,
            modalTitle: formatMessage({id: 'add'}),
            formData: formData
        });
    }

    // add or edit host
    handleOk = (data) => {
        if (data.host_id == '') {
            // add host
            this.props.onAddHost(data);
        } else {
            // edit host
            this.props.onEditHost(data);
        }
        this.setState({
            visible: false
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
    }

    handleEdit = (row) => {
        const formData = {
            host_id: row.key,
            group_name: row.group_name,
            host_name: row.host_name,
            ip_address: row.ip_address,
            user_name: '',
            password: ''
        };
        this.setState({
            visible: true,
            modalTitle: formatMessage({id: 'edit'}),
            formData: formData
        });
    }

    // delete you selected rows
    onClickDelete = () => {
        const data = {
            hostID: this.state.selectedRowKeys
        };
        if(data.hostID.length > 0) {
            const onDeleteHost = this.props.onDeleteHost;
            confirm({
                title: formatMessage({id: 'confirm_title'}),
                content: formatMessage({id: 'total'}) + data.hostID.length,
                okText: formatMessage({id: 'yes'}),
                okType: 'danger',
                cancelText: formatMessage({id: 'no'}),
                onOk: () => onDeleteHost(data)
            });
        } else {
            message.error(formatMessage({id: 'no_checked'}));
        }
    }

    // delete one row
    handleDelete = (key) => {
        const data = {
            hostID: [key]
        };
        this.props.onDeleteHost(data);
    }

    handleTest = (data) => {
        this.props.onTestHost(data);
    }

    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        return (
            <div>
              <Spin spinning={ this.props.loading }>
                <Row style={{ margin: 20 }}>
                  <Col span={2}>
                    <Button onClick={this.onClickAdd}><Icon type="plus-circle" /><FormattedMessage id='add' /></Button>
                    <ModalForm
                      title={this.state.modalTitle}
                      visible={this.state.visible}
                      formData={this.state.formData}
                      onOk={this.handleOk}
                      onTest={this.handleTest}
                      confirmLoading={this.state.confirmLoading}
                      onCancel={this.handleCancel}
                      >
                    </ModalForm>
                  </Col>
                  <Col sapn={2}><Button onClick={this.onClickDelete} type="danger"><Icon type="minus-circle" /><FormattedMessage id='delete' /></Button></Col>
                </Row>
                <Row>
                  <Col>
                    <Table
                      {...this.state}
                      style={{ minHeight: 520 }}
                      columns={this.columns}
                      dataSource={this.props.hostData}
                      />
                  </Col>
                </Row>
              </Spin>
            </div>
        );
    }
}

export default HostManage;
