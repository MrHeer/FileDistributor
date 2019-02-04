import { Component } from 'react';
import {
    Table, Radio, Form, Divider
} from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';

const FormItem = Form.Item;

const data = [];
for (let i = 1; i <= 10; i++) {
    data.push({
        key: i,
        group_name: 'John Brown',
        host_name: `${i}2`,
        ip: `New York No. ${i} Lake Park`,
    });
}

class HostManage extends Component {
    state = {
        loading: false,
        pagination: "bottom",
        size: 'default',
        title: () => formatMessage({id: 'hosts_title'}),
        hasData: true,
    }

    columns = [{
        title: formatMessage({id: 'group_name'}),
        dataIndex: 'group_name',
        key: 'group_name',
        sorter: (a, b) => a.ip > b.ip ? 1 : -1,
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
        render: () => (
            <span>
              <a href="javascript:;"><FormattedMessage id='delete' /></a>
              <Divider type="vertical" />
              <a href="javascript:;"><FormattedMessage id='edit' /></a>
            </span>
        )
    }]

    render() {
        const state = this.state;
        return (
            <Table {...this.state} columns={this.columns} dataSource={data} />
        );
    }
}

export default HostManage;
