import { Component } from "react";
import {
  Row,
  Col,
  Card,
  Upload,
  Button,
  Icon,
  Tree,
  Input,
  List,
  Radio,
  Spin
} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { FormattedMessage, formatMessage } from "umi/locale";
import { connect } from "dva";

const { TreeNode } = Tree;
const RadioGroup = Radio.Group;

import Styles from "./FileDistributeStyles.less";

const mapStateToProps = state => {
  const { treeData } = state["treeData"];
  const { selectedHost, buttonType } = state["distributeData"];
  return {
    treeData,
    selectedHost,
    buttonType,
    loading: state.loading.global
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onQueryTree: () => {
      dispatch({
        type: "treeData/fetch"
      });
    },

    onDistribute: data => {
      dispatch({
        type: "distributeData/distribute",
        payload: data
      });
    },

    updateSelectHost: data => {
      dispatch({
        type: "distributeData/updateSelectHost",
        payload: data
      });
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class FileDistribute extends Component {
  state = {
    fileList: [],
    expandedKeys: ["G-0"],
    autoExpandParent: true,
    checkedKeys: [],
    selectedKeys: [],
    remotePath: "",
    // distribute type: 'safe', 'overwrite'
    type: "safe"
  };

  handleChange = info => {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-1);

    this.setState({ fileList });
  };

  onExpand = expandedKeys => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false
    });
  };

  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    });

    // logical judgment about only inserting leaf into selectedHost
    const treeData = this.props.treeData;
    const hostData = [];
    const selectedHost = [];

    // get the all hostData
    for (let group of treeData.values()) {
      for (let host of group.children.values()) {
        hostData.push(host);
      }
    }

    // get the selectedHost
    for (let host of hostData.values()) {
      if (checkedKeys.includes(host.key)) {
        // status: 'wait', 'success', 'exist', 'error'
        selectedHost.push({ key: host.key, title: host.title, status: "wait" });
      }
    }

    const data = {
      selectedHost: selectedHost
    };
    this.props.updateSelectHost(data);
  };

  onRadioChange = e => {
    this.setState({
      type: e.target.value
    });
  };

  resetSelectedHost = () => {
    const { selectedHost } = this.props;
    selectedHost.forEach(host => {
      host.status = "wait";
    });
    const data = {
      selectedHost: selectedHost
    };
    this.props.updateSelectHost(data);
  };

  handleRemotePathChange = e => {
    this.setState({
      remotePath: e.target.value
    });
  };

  handleDistribute = () => {
    const { fileList, remotePath, type } = this.state;
    const { selectedHost } = this.props;
    const data = {
      fileList,
      selectedHost,
      remotePath,
      type
    };
    this.props.onDistribute(data);
  };

  componentDidMount() {
    this.props.onQueryTree();
  }

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  renderList = item => {
    if (item.status === "wait") {
      return (
        <span className={Styles["override-ant-list"]}>
          <List.Item>
            <Row>
              <Col span={22}>{item.title}</Col>
              <Col span={2}>
                <Icon type="clock-circle" />
              </Col>
            </Row>
          </List.Item>
        </span>
      );
    } else if (item.status === "success") {
      return (
        <span className={Styles["override-ant-list"]}>
          <List.Item>
            <Row>
              <Col span={22}>{item.title}</Col>
              <Col span={2}>
                <Icon
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="#52c41a"
                />
              </Col>
            </Row>
          </List.Item>
        </span>
      );
    } else if (item.status === "exist") {
      return (
        <span className={Styles["override-ant-list"]}>
          <List.Item>
            <Row>
              <Col span={22}>{item.title}</Col>
              <Col span={2}>
                <Icon
                  type="exclamation-circle"
                  theme="twoTone"
                  twoToneColor="#faad14"
                />
              </Col>
            </Row>
          </List.Item>
        </span>
      );
    } else {
      return (
        <span className={Styles["override-ant-list"]}>
          <List.Item>
            <Row>
              <Col span={22}>{item.title}</Col>
              <Col span={2}>
                <Icon
                  type="close-circle"
                  theme="twoTone"
                  twoToneColor="#eb2f96"
                />
              </Col>
            </Row>
          </List.Item>
        </span>
      );
    }
  };

  renderButton = () => {
    const { buttonType } = this.props;
    if (buttonType === "distribute") {
      return (
        <Button onClick={this.handleDistribute}>
          <Icon type="rocket" />
          <FormattedMessage id="distribute" />
        </Button>
      );
    } else if (buttonType === "retry") {
      return (
        <Button onClick={this.handleDistribute}>
          <Icon type="reload" />
          <FormattedMessage id="retry" />
        </Button>
      );
    } else {
      return (
        <Button onClick={this.resetSelectedHost}>
          <Icon type="rollback" />
          <FormattedMessage id="reset" />
        </Button>
      );
    }
  };

  render() {
    const props = {
      action: "/api/uploadFile",
      onChange: this.handleChange,
      multiple: true
    };

    return (
      <Row gutter={5}>
        <Spin spinning={this.props.loading}>
          <Col span={8}>
            <Card
              className={Styles.card}
              title={formatMessage({ id: "chose_file" })}
            >
              <div
                style={{
                  overflow: "auto",
                  height: 450
                }}
              >
                <InfiniteScroll
                  loadMore={() => {
                    return;
                  }}
                >
                  <Upload {...props} fileList={this.state.fileList}>
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
              title={formatMessage({ id: "chose_host" })}
            >
              <div
                style={{
                  overflow: "auto",
                  height: 450
                }}
              >
                <InfiniteScroll
                  loadMore={() => {
                    return;
                  }}
                >
                  <Tree
                    multiple={true}
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    selectedKeys={this.state.selectedKeys}
                  >
                    {this.renderTreeNodes(this.props.treeData)}
                  </Tree>
                </InfiniteScroll>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              className={Styles.card}
              title={formatMessage({ id: "distribute_file" })}
            >
              <Row>
                <Col>{formatMessage({ id: "checked" })}</Col>
              </Row>
              <Row>
                <Col>
                  <div
                    style={{
                      overflow: "auto",
                      height: 280
                    }}
                  >
                    <InfiniteScroll
                      loadMore={() => {
                        return;
                      }}
                    >
                      <List
                        size="small"
                        dataSource={this.props.selectedHost}
                        renderItem={this.renderList}
                      />
                    </InfiniteScroll>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: 20, marginBottom: 20 }}>
                <Col>
                  <Input
                    allowClear
                    onChange={this.handleRemotePathChange}
                    placeholder={formatMessage({ id: "remote_path" })}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: 20 }} type="flex" justify="center">
                <Col>
                  <RadioGroup
                    onChange={this.onRadioChange}
                    value={this.state.type}
                  >
                    <Radio value="safe">
                      <FormattedMessage id="safe" />
                    </Radio>
                    <Radio value="overwrite">
                      <FormattedMessage id="overwrite" />
                    </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col>{this.renderButton()}</Col>
              </Row>
            </Card>
          </Col>
        </Spin>
      </Row>
    );
  }
}

export default FileDistribute;
