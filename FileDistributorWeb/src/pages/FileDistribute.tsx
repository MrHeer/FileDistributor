import { SFC, useEffect, useState, ReactText } from "react";
import {
  Row,
  Col,
  Card,
  Upload,
  Button,
  Tree,
  Input,
  List,
  Radio,
  Spin,
} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { FormattedMessage, formatMessage, connect, ConnectProps } from "umi";

const { TreeNode } = Tree;
const RadioGroup = Radio.Group;
type DistributeType = "safe" | "overwrite";

import Styles from "./FileDistributeStyles.less";
import { ConnectState } from "@/models/connect";
import { Dispatch } from "umi";
import {
  DistributeHost,
  ButtonType,
  Tree as TreeModel,
} from "@/models/interface";
import React from "react";
import { UploadFile, UploadChangeParam } from "antd/lib/upload/interface";
import { RadioChangeEvent } from "antd/lib/radio/interface";
import {
  CheckCircleTwoTone,
  ClockCircleOutlined,
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
  RocketOutlined,
  ReloadOutlined,
  RollbackOutlined,
  UploadOutlined,
} from "@ant-design/icons";

interface FileDistributeProps extends ConnectProps {
  treeData: TreeModel[];
  selectedHosts: DistributeHost[];
  buttonType: ButtonType;
  loading?: boolean;
  dispatch: Dispatch;
}

const FileDistribute: SFC<FileDistributeProps> = (props) => {
  const {
    treeData,
    selectedHosts,
    buttonType,
    loading = true,
    dispatch,
  } = props;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [remotePath, setRemotePath] = useState("");
  const [type, setType] = useState<DistributeType>("safe");

  const onQueryTree = () => {
    dispatch({
      type: "treeData/fetch",
    });
  };

  const onDistribute = (data: {
    fileList: UploadFile[];
    selectedHosts: DistributeHost[];
    remotePath: string;
    type: DistributeType;
  }) => {
    dispatch({
      type: "distributeData/distribute",
      payload: data,
    });
  };

  const updateSelectHost = (data: { selectedHosts: DistributeHost[] }) => {
    dispatch({
      type: "distributeData/updateSelectHost",
      payload: data,
    });
  };
  const handleChange = (info: UploadChangeParam) => {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    // fileList = fileList.slice(-1);

    setFileList(fileList);
  };

  const onExpand = (expandedKeys: React.Key[]) => {
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys: any) => {
    setCheckedKeys(checkedKeys);

    // logical judgment about only inserting leaf into selectedHost
    const hostData: TreeModel[] = [];
    const selectedHosts: DistributeHost[] = [];

    // get the all hostData
    for (let group of treeData.values()) {
      if (group.children) {
        for (let host of group.children.values()) {
          hostData.push(host);
        }
      }
    }

    // get the selectedHost
    for (let host of hostData.values()) {
      if (checkedKeys.includes(host.key)) {
        selectedHosts.push({
          key: host.key,
          title: host.title,
          status: "wait",
        });
      }
    }

    updateSelectHost({ selectedHosts });
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  const resetSelectedHost = () => {
    selectedHosts.forEach((host) => {
      host.status = "wait";
    });
    updateSelectHost({ selectedHosts });
  };

  const handleRemotePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemotePath(e.target.value);
  };

  const handleDistribute = () => {
    const data = {
      fileList,
      selectedHosts,
      remotePath,
      type,
    };
    onDistribute(data);
  };

  useEffect(() => {
    onQueryTree();
  });

  const renderTreeNodes = (data: TreeModel[]) =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  const renderList = (item: DistributeHost) => {
    if (item.status === "wait") {
      return (
        <span className={Styles["override-ant-list"]}>
          <List.Item>
            <Row>
              <Col span={22}>{item.title}</Col>
              <Col span={2}>
                <ClockCircleOutlined />
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
                <CheckCircleTwoTone twoToneColor="#52c41a" />
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
                <ExclamationCircleTwoTone twoToneColor="#faad14" />
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
                <CloseCircleTwoTone twoToneColor="#eb2f96" />
              </Col>
            </Row>
          </List.Item>
        </span>
      );
    }
  };

  const renderButton = () => {
    if (buttonType === "distribute") {
      return (
        <Button onClick={handleDistribute}>
          <RocketOutlined />
          <FormattedMessage id="distribute" />
        </Button>
      );
    } else if (buttonType === "retry") {
      return (
        <Button onClick={handleDistribute}>
          <ReloadOutlined />
          <FormattedMessage id="retry" />
        </Button>
      );
    } else {
      return (
        <Button onClick={resetSelectedHost}>
          <RollbackOutlined />
          <FormattedMessage id="reset" />
        </Button>
      );
    }
  };
  const uploadProps = {
    action: "/api/uploadFile",
    onChange: handleChange,
    multiple: true,
  };

  return (
    <Row gutter={5}>
      <Spin spinning={loading}>
        <Col span={8}>
          <Card
            className={Styles.card}
            title={formatMessage({ id: "chose_file" })}
          >
            <div
              style={{
                overflow: "auto",
                height: 450,
              }}
            >
              <InfiniteScroll
                loadMore={() => {
                  return;
                }}
              >
                <Upload {...uploadProps} fileList={fileList}>
                  <Button>
                    <UploadOutlined />
                    <FormattedMessage id="upload" />
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
                height: 450,
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
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                >
                  {renderTreeNodes(treeData)}
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
                    height: 280,
                  }}
                >
                  <InfiniteScroll
                    loadMore={() => {
                      return;
                    }}
                  >
                    <List
                      size="small"
                      dataSource={selectedHosts}
                      renderItem={renderList}
                    />
                  </InfiniteScroll>
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: 20, marginBottom: 20 }}>
              <Col>
                <Input
                  allowClear
                  onChange={handleRemotePathChange}
                  placeholder={formatMessage({ id: "remote_path" })}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }} justify="center">
              <Col>
                <RadioGroup onChange={onRadioChange} value={type}>
                  <Radio value="safe">
                    <FormattedMessage id="safe" />
                  </Radio>
                  <Radio value="overwrite">
                    <FormattedMessage id="overwrite" />
                  </Radio>
                </RadioGroup>
              </Col>
            </Row>
            <Row justify="center">
              <Col>{renderButton()}</Col>
            </Row>
          </Card>
        </Col>
      </Spin>
    </Row>
  );
};

export default connect(
  ({
    treeData: { treeData },
    distributeData: { selectedHosts, buttonType },
    loading: { models },
  }: ConnectState) => ({
    treeData,
    selectedHosts,
    buttonType,
    loading: models.distributeData,
  })
)(FileDistribute);
