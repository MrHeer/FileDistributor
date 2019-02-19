import { Component } from 'react';
import { Row,
         Col,
         Card,
         Upload,
         Button,
         Icon,
         Tree,
         Input,
         List,
         Spin
       } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { connect } from 'dva';
const { TreeNode } = Tree;

import Styles from './FileDistributeStyles.less';

const mapStateToProps = (state) => {
    const { treeData } = state['treeData'];
    const { distributeStatus } = state['distribute'];
    return {
        treeData,
        distributeStatus,
        loading: state.loading.global
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: 'treeData/fetch'
            });
        },

        onDistribute: (data) => {
            dispatch({
                type: 'distribute/distribute',
                payload: data
            });
        }
    };
};

@connect(mapStateToProps, mapDispatchToProps)
class FileDistribute extends Component {
    state = {
        fileList: [],
        expandedKeys: ['G-0'],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        selectedHost: [{
            // key: '';
            // percent: 0;
        }],

        // SelectedHostTitles
        listData: [],
        remotePath: ''
    }

    handleChange = (info) => {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. Filter successfully uploaded files according to response from server
        // fileList = fileList.filter((file) => {
        //     if (file.response) {
        //         return file.response.status === 'success';
        //     }
        //     return false;
        // });

        this.setState({ fileList });
    }

    onExpand = (expandedKeys) => {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    }

    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        });

        // logical judgment about only inserting leaf into listData
        const treeData = this.props.treeData;
        const groupKeys = [];
        const selectedHost = [];
        const selectedHostKeys = [];
        const selectedHostTitles = [];

        // get the groupKeys
        for(let group of treeData.values()) {
            groupKeys.push(group.key);
        }

        // get the selectedHost
        for(let key of checkedKeys.values()) {
            if(!groupKeys.includes(key)) {
                selectedHostKeys.push(key);
                selectedHost.push({key: key, percent: 0});
            }
        }

        // get the selectedHostTitles
        for(let group of treeData.values()) {
            for(let host of group.children.values()) {
                if(selectedHostKeys.includes(host.key)) {
                    selectedHostTitles.push(host.title);
                }
            }
        }

        this.setState({
            listData: selectedHostTitles,
            selectedHost: selectedHost
        });
    }

    handleRemotePathChange = (e) => {
        this.setState({
            remotePath: e.target.value
        });
    }

    handleDistribute = () => {
        const {fileList, selectedHost, remotePath} = this.state;
        const data = {
            fileList,
            selectedHost,
            remotePath
        };
        this.props.onDistribute(data);
    }

    componentDidMount() {
        this.props.onDidMount();
    }

    renderTreeNodes = data => data.map((item) => {
        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                  {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }
        return <TreeNode {...item} />;
    })

    renderList = item => {
        return (
            <List.Item>{item}</List.Item>
        );
    }

    render() {
        const props = {
            action: '/api/uploadFile',
            onChange: this.handleChange,
            multiple: true,
        };

        return (
            <Row gutter={5}>
              <Spin spinning={ this.props.loading }>
                <Col span={8}>
                  <Card
                    className={Styles.card}
                    title={ formatMessage({id: 'chose_file'}) }
                    >
                    <div
                      style={{
                          overflow: 'auto',
                          height: 420
                      }}
                      >
                      <InfiniteScroll loadMore={()=>{return}}>
                        <Upload {...props}
                                fileList={this.state.fileList}
                                >
                          <Button>
                            <Icon type="upload" /> <FormattedMessage id="upload" />
                          </Button>
                        </Upload>
                      </InfiniteScroll>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className={Styles.card}
                    title={ formatMessage({id: 'chose_host'}) }
                    >
                    <div
                      style={{
                          overflow: 'auto',
                          height: 420
                      }}
                      >
                      <InfiniteScroll loadMore={()=>{return}}>
                        <Tree
                          multiple={true}
                          checkable
                          onExpand={ this.onExpand }
                          expandedKeys={ this.state.expandedKeys }
                          autoExpandParent={ this.state.autoExpandParent }
                          onCheck={ this.onCheck }
                          checkedKeys={ this.state.checkedKeys }
                          selectedKeys={ this.state.selectedKeys }
                          >
                          { this.renderTreeNodes(this.props.treeData) }
                        </Tree>
                      </InfiniteScroll>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    className={Styles.card}
                    title={ formatMessage({id: 'distribute_file'}) }
                    >
                    <Row>
                      <Col>{ formatMessage({id: 'checked'}) }</Col>
                    </Row>
                    <Row>
                      <Col>
                        <div
                          style={{
                              overflow: 'auto',
                              height: 300
                          }}
                          >
                          <InfiniteScroll loadMore={()=>{return}}>
                            <List
                              size="small"
                              dataSource={ this.state.listData }
                              renderItem={ this.renderList } />
                          </InfiniteScroll>
                        </div>
                      </Col>
                    </Row>
                    <Row style={{ marginTop: 20, marginBottom: 20 }}>
                      <Col><Input onChange={this.handleRemotePathChange} placeholder={ formatMessage({id: 'remote_path'})} /></Col>
                    </Row>
                    <Row type="flex" justify="center">
                      <Col><Button onClick={this.handleDistribute}><Icon type="rocket" /><FormattedMessage id='distribute' /></Button></Col>
                    </Row>
                  </Card>
                </Col>
              </Spin>
            </Row>
        );
    }
}

export default FileDistribute;
