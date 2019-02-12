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
         Spin,   //Scroller
       } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { message } from 'antd';
const { TreeNode } = Tree;

class FileDistribute extends Component {
    state = {
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png'
        }],
        expandedKeys: ['G-0'],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        parentKeys:[],
        treeData: [{
            title: 'Group-0',
            key: 'G-0',
            children: [
                {title: 'Host-0',key: 'H-0'},
                {title: 'Host-1',key: 'H-1'},
                {title: 'Host-2',key: 'H-2'},
            ]},{
                title: 'Group-1',
                key: 'G-1',
                children: [
                    {title: 'Host-3',key: 'H-3'},
                    {title: 'Host-4',key: 'H-4'},
                    {title: 'Host-5',key: 'H-5'},
                    {title: 'Host-6',key: 'H-6'},
                    {title: 'Host-7',key: 'H-7'},
                    {title: 'Host-8',key: 'H-8'},
                    {title: 'Host-9',key: 'H-9'},
                ]
            }],
        listData: [],

        //listscroller
        listLoading: false,
        listHasMore: true,
        //treescroller
        treeLoading: false,
        treeHasMore: true,
    }

    handleChange = (info) => {
        let fileList = info.fileList;

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. Filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return false;
        });

        this.setState({ fileList });
    }
    
    onExpand = (expandedKeys) => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        const { parentKeys }=this.state;
        console.log('onCheck', checkedKeys);
        this.setState({ 
          checkedKeys,
        });

        //logical judgment about only inserting leaf into listData
        var noParentKeys = [];
        for(var i in checkedKeys)
          if(!parentKeys.includes(checkedKeys[i]))
            noParentKeys.push(checkedKeys[i]);
        this.setState({
          listData: noParentKeys,
          selectedKeys:noParentKeys,
        });
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    }
    
    //choose the keys of parent treenode  
    judgeTreeNodes = (data) => {
      var result = [];
      for(var i in data)
        result.push(data[i].key);
      return result;
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

    //listScroller 
     listInfiniteOnLoad = () => {
      let listData = this.state.listData;
      this.setState({
        listLoading: true,
      });
      if (listData.length >4 ) {
        this.setState({
          listHasMore: false,
          listLoading: false,
        });
        return;
      }
    }

    //treeScroller
    treeInfiniteOnLoad = () => {
      let treeData = this.state.treeData;
      this.setState({
        treeLoading: true,
      });
      if (treeData.length >2 ) {
        this.setState({
          listHasMore: false,
          listLoading: false,
        });
        return;
      }
    }

    componentDidMount(){
      //inserting the keys of parent treenode into parentKeys
      this.state.parentKeys = this.judgeTreeNodes(this.state.treeData);
    }

    render() {
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange,
            multiple: true,
        };

        return (
            <Row gutter={5}>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'chose_file'}) }
                  style={{
                    marginBottom: 15,
                  }} 
                  >
                  <Upload {...props} fileList={this.state.fileList}>
                    <Button>
                      <Icon type="upload" /> <FormattedMessage id="upload" />
                    </Button>
                  </Upload>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'chose_host'}) }
                  style={{
                    marginBottom: 15,
                  }} 
                  >
                  <div
                    style={{
                      border: '1px solid #e8e8e8',
                      borderRadius: '4px',
                      overflow: 'auto',
                      padding: '8px 24px',
                      height: '250px',}}
                  >
                   <InfiniteScroll  
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.treeInfiniteOnLoad}
                        hasMore={!this.state.treeLoading && this.state.treeHasMore}
                        useWindow={false}
                    >
                    <div></div>
                      <Tree
                        multiple={true}
                        checkable
                        onExpand={ this.onExpand }
                        expandedKeys={ this.state.expandedKeys }
                        autoExpandParent={ this.state.autoExpandParent }
                        onCheck={ this.onCheck }
                        checkedKeys={ this.state.checkedKeys }
                        onSelect={ this.onSelect }
                        selectedKeys={ this.state.selectedKeys }
                        >
                        { this.renderTreeNodes(this.state.treeData) }
                      </Tree>
                    </InfiniteScroll> 
                  </div>
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'distribute_file'}) }
                  style={{
                    marginBottom: 15,
                  }} 
                  >
                  <Row>
                  { formatMessage({id: 'checked'}) }
                    <div 
                      style={{
                          border: '1px solid #e8e8e8',
                          borderRadius: '4px',
                          overflow: 'auto',
                          padding: '8px 24px',
                          height: '200px',}}
                    >
                      <InfiniteScroll  
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.listInfiniteOnLoad}
                        hasMore={!this.state.listLoading && this.state.listHasMore}
                        useWindow={false}
                      >
                        <List
                          size="small"
                          bordered
                          dataSource={ this.state.listData }
                          renderItem={ this.renderList }>
                          {this.state.listLoading && this.state.listHasMore && (
                            <div style={{
                                  bottom: '40px',
                                  width: '100%',
                            }}
                            >
                              <Spin />
                            </div>
                          )}
                        </List>
                      </InfiniteScroll> 
                    </div>
                  </Row>
                  <Row style={{ marginTop: 20, marginBottom: 20 }}>
                    <Col><Input placeholder={ formatMessage({id: 'remote_path'})} /></Col>
                  </Row>
                  <Row type="flex" justify="center">
                    <Col><Button><Icon type="rocket" /><FormattedMessage id='distribute' /></Button></Col>
                  </Row>
                </Card>
              </Col>
            </Row>
        )
    }
}

export default FileDistribute;