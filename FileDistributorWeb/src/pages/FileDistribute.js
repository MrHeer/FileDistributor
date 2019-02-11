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
         message
       } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { FormattedMessage, formatMessage } from 'umi/locale';
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
        loading: false,
        hasMore: true,

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
        console.log('onCheck', checkedKeys);
        //new String(checkedstring);
        //checkedstring=checkedKeys;
        this.setState({ checkedKeys });
        //if(checkedKeys.charAt(0) == 'H')//add logical judgment about only children tree inserting into listData by Zhongnibug
          this.setState({
              listData: checkedKeys
          });
    }

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
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

    //Scroller 
     handleInfiniteOnLoad = () => {
      let listData = this.state.listData;
      let checkedKeys=this.state.checkedKeys;

      this.setState({
        loading: true,
      });
      if (listData.length == checkedKeys.length ) {
        message.warning('Infinite List loaded all');
        this.setState({
          hasMore: false,
          loading: false,
        });
        return;
      }
    }

    render() {
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange,
            multiple: true
        };

        return (
            <Row gutter={5}>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'chose_file'}) }
                  style={{ height: 600 }}>
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
                  style={{ height: 600 }}>
                  <Tree
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
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={ formatMessage({id: 'distribute_file'}) }
                  style={{ height: 600 }}>
                  <Row
                  style={{ height: 400 }}>
                  { formatMessage({id: 'checked'}) }
                    <div 
                      style={{
                          border: '1px solid #e8e8e8',
                          borderRadius: '4px',
                          overflow: 'auto',
                          padding: '8px 24px',
                          height: '300px',}}
                    >
                      <InfiniteScroll  
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                      >
 
                        <List
                          size="small"
                          bordered
                          dataSource={ this.state.listData }
                          renderItem={ this.renderList }>
                          {this.state.loading && this.state.hasMore && (
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