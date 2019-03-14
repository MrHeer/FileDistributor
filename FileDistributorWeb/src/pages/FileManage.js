import { Component } from 'react';
import {
    Table,
    Select,
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
import { stringify } from 'qs';

const Option = Select.Option;
const { confirm } = Modal;

const mapStateToProps = (state) => {
    const { fileData } = state['fileData'];
    const { hostData } = state['hostData'];
    return {
        fileData,
        hostData,
        loading: state.loading.global
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onQueryHost: () => {
            dispatch({
                type: 'hostData/fetch'
            });
        },

        onQueryFile: (data) => {
            dispatch({
                type: 'fileData/fetch',
                payload: data
            });
        },

        onDeleteFile: (data) => {
            dispatch({
                type: 'fileData/delete',
                payload: data
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class FileManage extends Component {
    onSelectChange = (selectedRowKeys, selectedRows) => {
        const selectedFiles = [];
        selectedRows.forEach(row => selectedFiles.push(row.name));
        this.setState({
            selectedFiles: selectedFiles
        });
    }

    onShowSizeChange = (current, pageSize) => {
    }

    onPageChange = (pageNumber) => {
    }

    state = {
        hostID: '',
        remotePath: '',
        keyword: '',
        selectedFiles: [],
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
        }
    }

    columns = [{
        title: formatMessage({id: 'file_name'}),
        key: 'name',
        sorter: (a, b) => a.group_name > b.group_name ? 1 : -1,
        width: 450,
        render: (text, record) => {
            if(record.type === '-') {
                const { hostID, remotePath } = this.state;
                const params = {
                    hostID: hostID,
                    remotePath: remotePath,
                    fileName: record.name
                };
                return (
                    <a href={`/api/download?${stringify(params)}`} download={record.name}><Icon type="file" style={{ marginRight: '1em' }} />{record.name}</a>
                );
            } else if(record.type === 'd') {
                return (
                    <a onClick={() => this.handleChangePath(record)}><Icon type="folder" style={{ marginRight: '1em' }} />{record.name}</a>
                );
            } else {
                return (
                    <a onClick={() => this.handleChangePath(record)}><Icon type="file-unknown" style={{ marginRight: '1em' }} />{record.name}</a>
                );
            }
        }
    }, {
        title: formatMessage({id: 'file_size'}),
        dataIndex: 'size',
        key: 'size',
        width: 250,
    }, {
        title: formatMessage({id: 'modify_time'}),
        dataIndex: 'modify_time',
        key: 'modify_time',
        width: 400
    }, {
        title: formatMessage({id: 'action'}),
        key: 'action',
        width: 160,
        render: (text, record) => (
            <span>
              <Popconfirm title={formatMessage({id: 'pop_confirm_title'})} onConfirm={() => this.handleDelete(record)}>
                <a><FormattedMessage id='delete' /></a>
              </Popconfirm>
            </span>
        )
    }]

    // query file data
    handleQuery = () => {
        const { hostID, remotePath, keyword } = this.state;
        const data = {
            hostID: hostID,
            remotePath: remotePath,
            keyword: keyword
        };
        this.props.onQueryFile(data);
    }

    handleSelectChange = (value) => {
        this.setState({
            hostID: value
        });
    }

    handleRemotePathChange = (e) => {
        e.preventDefault();
        this.setState({
            remotePath: e.target.value
        });
    }

    handleKeywordChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    handleChangePath = (record) => {
        const { hostID, remotePath, keyword } = this.state;
        var newPath = `${remotePath}/${record.name}`;
        newPath = newPath.replace('//','/');
        const data = {
            hostID: hostID,
            remotePath: newPath,
            keyword: keyword
        };
        this.props.onQueryFile(data);
        this.setState({
            remotePath: newPath
        });
    }

    // delete you selected rows
    onClickDelete = () => {
        const data = {
            hostID: this.state.hostID,
            remotePath: this.state.remotePath,
            files: this.state.selectedFiles
        };
        if(data.files.length > 0) {
            const onDeleteFile = this.props.onDeleteFile;
            confirm({
                title: formatMessage({id: 'file_confirm_title'}),
                content: formatMessage({id: 'total'}) + data.files.length,
                okText: formatMessage({id: 'yes'}),
                okType: 'danger',
                cancelText: formatMessage({id: 'no'}),
                onOk: () => onDeleteFile(data)
            });
        } else {
            message.error(formatMessage({id: 'no_checked'}));
        }
    }

    // delete one row
    handleDelete = (record) => {
        const data = {
            hostID: this.state.hostID,
            remotePath: this.state.remotePath,
            files: [record.name]
        };
        this.props.onDeleteFile(data);
    }

    onBackKeyDown = (e) => {
        if (e.target.localName == 'input') {
            return;
        }
        switch(e.keyCode) {
            // Backspace
            case 8:
                this.onClickBack();
                break
        }
    }

    onClickBack = () => {
        const { hostID, remotePath, keyword } = this.state;
        var newPath = remotePath.split('/');
        newPath.pop();
        newPath = newPath.join('/');
        newPath = newPath.replace('//','/');
        const data = {
            hostID: hostID,
            remotePath: newPath,
            keyword: keyword
        };
        this.props.onQueryFile(data);
        this.setState({
            remotePath: newPath
        });
    }

    componentDidMount() {
        document.addEventListener("keyup", this.onBackKeyDown, true);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.onBackKeyDown, true);
    }

    render() {
        return (
            <div>
              <Spin spinning={ this.props.loading }>
                <Row gutter={10} style={{ margin: 20 }}>
                  <Col span={5}>
                    <Select
                      showSearch
                      style={{ width: '-webkit-fill-available' }}
                      placeholder={formatMessage({id: 'chose_host'})}
                      onChange={this.handleSelectChange}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                      {this.props.hostData.map(host => <Option key={host.key}>{host.host_name}</Option>)}
                    </Select>
                  </Col>
                  <Col span={5}>
                    <Input
                      value={this.state.remotePath}
                      onChange={this.handleRemotePathChange}
                      placeholder={formatMessage({id: 'remote_path'})}
                      allowClear
                    />
                  </Col>
                  <Col span={5}>
                    <Input
                      onChange={this.handleKeywordChange}
                      placeholder={formatMessage({id: 'keyword'})}
                      allowClear
                    />
                  </Col>
                  <Col span={2}><Button onClick={this.handleQuery}><Icon type="reload" /><FormattedMessage id='reload' /></Button></Col>
                </Row>
                <Row gutter={10} style={{ margin: 20 }}>
                  <Col span={2}><Button onClick={this.onClickBack}><Icon type="rollback" /><FormattedMessage id='back' /></Button></Col>
                  <Col span={2}><Button onClick={this.onClickDelete} type="danger"><Icon type="minus-circle" /><FormattedMessage id='delete' /></Button></Col>
                </Row>
                <Row>
                  <Col>
                    <Table
                      {...this.state}
                      style={{ minHeight: 520 }}
                      columns={this.columns}
                      dataSource={this.props.fileData}
                      />
                  </Col>
                </Row>
              </Spin>
            </div>
        );
    }
}

export default FileManage;
