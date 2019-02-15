import { Component } from 'react';
import {
    Table, Form, Divider, Row, Col, Button, Icon, Popconfirm
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';

const FormItem = Form.Item;

const data = [];
for (let i = 1; i <= 60; i++) {
    data.push({
        key: i,
        group_name: 'Group1',
        host_name: `Hohst${i}`,
        ip: `10.34.45.${i}`,
    });
}

for (let i = 61; i <= 120; i++) {
    data.push({
        key: i,
        group_name: 'Group2',
        host_name: `Hohst${i}`,
        ip: `10.34.46.${i}`,
    });
}

class HostManage extends Component {
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log("selectedrowKeys", selectedRowKeys);
        console.log("selectedRows", selectedRows);
        if(selectedRowKeys.length > 0) {
            this.setState({
                selectedRowKeys: selectedRowKeys,
                selectedRows: selectedRows,
                deleteButton: false
            })
        } else {
            this.setState({
                selectedRowKeys: [],
                selectedRows: [],
                deleteButton: true
            })
        }
    }

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    }

    onPageChange = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }

    state = {
        loading: true,
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
                <a href="javascript:;"><FormattedMessage id='delete' /></a>
              </Popconfirm>
              <Divider type="vertical" />
              <a href="javascript:;"><FormattedMessage id='edit' /></a>
            </span>
        )
    }]

    // TODO
    onClickAdd = () => {
        console.log("Add Clicked!");
    }

    // TODO: Alert
    onClickDelete = () => {
        console.log("Delete Clicked!");
        console.log(this.state.selectedRowKeys);
    }

    // TODO
    onClickEdit = (row) => {
        console.log("Edit Clicked!", row);
    }

    // delete one row
    handleDelete = (key) => {
        console.log('Delete: ', key);
    }

    componentDidMount() {
        this.setState({
            loading: false
        })
    }

    render() {
        return (
            <div>
              <Row style={{ margin:20 }}>
                <Col span={2}><Button onClick={this.onClickAdd}><Icon type="plus-circle" /><FormattedMessage id='add' /></Button></Col>
                <Col sapn={2}><Button onClick={this.onClickDelete} disabled={this.state.deleteButton} type="danger"><Icon type="minus-circle" /><FormattedMessage id='delete' /></Button></Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    {...this.state}
                    columns={this.columns}
                    dataSource={data}
                    />
                </Col>
              </Row>
            </div>
        );
    }
}

export default HostManage;
