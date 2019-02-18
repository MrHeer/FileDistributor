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
    Spin
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { connect } from 'dva';

const { confirm } = Modal;
const FormItem = Form.Item;

const ModalForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends Component {
        render() {
            const {
                visible, confirmLoading, title, onOk, onCancel, form
            } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                  confirmLoading={confirmLoading}
                  visible={visible}
                  title={title}
                  onCancel={onCancel}
                  onOk={onOk}
                  >
                  <Form layout="vertical">
                    <FormItem label={formatMessage({id: 'group_name'})}>
                      {getFieldDecorator('groupName', {
                        rules: [{ required: true, message: formatMessage({id: 'group_name_message'}) }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label={formatMessage({id: 'host_name'})}>
                      {getFieldDecorator('hostName', {
                        rules: [{ required: true, message: formatMessage({id: 'host_name_message'}) }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label={formatMessage({id: 'ip_address'})}>
                      {getFieldDecorator('ipAddress', {
                        rules: [{ required: true, message: formatMessage({id: 'ip_address_message'}) }],
                      })(
                        <Input />
                      )}
                     </FormItem>
                    <FormItem label={formatMessage({id: 'user_name'})}>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: formatMessage({id: 'user_name_message'}) }],
                      })(
                        <Input />
                      )}
                    </FormItem>
                    <FormItem label={formatMessage({id: 'password'})}>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: formatMessage({id: 'password_message'}) }],
                      })(
                        <Input.Password />
                      )}
                    </FormItem>
                    <Button><FormattedMessage id='test' /></Button>
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
                type: 'hostData/fetch',
            });
        },
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class HostManage extends Component {
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log("selectedrowKeys", selectedRowKeys);
        console.log("selectedRows", selectedRows);
        if(selectedRowKeys.length > 0) {
            this.setState({
                selectedRowKeys: selectedRowKeys,
                selectedRows: selectedRows,
                deleteButton: false
            });
        } else {
            this.setState({
                selectedRowKeys: [],
                selectedRows: [],
                deleteButton: true
            });
        }
    }

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    }

    onPageChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }

    state = {
        visible: false,
        confirmLoading: false,
        modalTitle: formatMessage({id: 'add'}),
        hasData: true,
        deleteButton: true,
        selectedRowKeys: [],
        selectedRows: [],
        pagination: {
            showQuickJumper: true,
            showSizeChanger: true,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ['10', '20', '50', '100', '300', '500'],
            onChange: this.onPageChange
        },
        rowSelection: {
            onChange: this.onSelectChange
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
        dataIndex: 'ip',
        key: 'ip',
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
              <a onClick={() => this.handleEdit(record.key)}><FormattedMessage id='edit' /></a>
            </span>
        )
    }]

    onClickAdd = () => {
        this.setState({
            visible: true,
            modalTitle: formatMessage({id: 'add'}),
        });
    }

    handleOk = () => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    handleEdit = (row) => {
        console.log("Edit Clicked!", row);
        this.setState({
            visible: true,
            modalTitle: formatMessage({id: 'edit'}),
        });
    }

    // delete you selected rows
    onClickDelete = () => {
        confirm({
            title: formatMessage({id: 'confirm_title'}),
            content: formatMessage({id: 'total'}) + this.state.selectedRowKeys.length,
            okText: formatMessage({id: 'yes'}),
            okType: 'danger',
            cancelText: formatMessage({id: 'no'}),
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
        console.log(this.state.selectedRowKeys);
    }

    // delete one row
    handleDelete = (key) => {
        console.log('Delete: ', key);
    }

    componentDidMount() {
        this.props.onDidMount();
    }

    render() {
        return (
            <div>
              <Spin spinning={ this.props.loading }>
                <Row style={{ margin:20 }}>
                  <Col span={2}>
                    <Button onClick={this.onClickAdd}><Icon type="plus-circle" /><FormattedMessage id='add' /></Button>
                    <ModalForm
                      title={this.state.modalTitle}
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      confirmLoading={this.state.confirmLoading}
                      onCancel={this.handleCancel}
                      >
                    </ModalForm>
                  </Col>
                  <Col sapn={2}><Button onClick={this.onClickDelete} disabled={this.state.deleteButton} type="danger"><Icon type="minus-circle" /><FormattedMessage id='delete' /></Button></Col>
                </Row>
                <Row>
                  <Col>
                    <Table
                      {...this.state}
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
