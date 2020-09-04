import React, { FC, useState, useEffect } from "react";
import { Layout, Menu, Row, Col, Button } from "antd";
import { Link, useLocation } from "umi";
import { FormattedMessage, formatMessage, getLocale, setLocale } from "umi";
import {
  RocketOutlined,
  FileOutlined,
  FolderOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import DocumentTitle from "react-document-title";

const { Header, Content, Footer } = Layout;

const BasicLayout: FC = (props) => {
  const [selectedKey, setSelectedKey] = useState("1");
  const { pathname } = useLocation();

  // change the language
  const onClickLang = () => {
    const locale = getLocale();
    if (!locale || locale === "zh-CN") {
      setLocale("en-US");
    } else {
      setLocale("zh-CN");
    }
  };

  useEffect(() => {
    if (pathname === "/FileDistribute") {
      setSelectedKey("1");
    } else if (pathname === "/FileManage") {
      setSelectedKey("2");
    } else if (pathname === "/HostManage") {
      setSelectedKey("3");
    }
  });

  return (
    <Layout>
      <DocumentTitle title={formatMessage({ id: "project_name" })} />
      <Header style={{ background: "#fff" }}>
        <Row>
          <Col span={1}>
            <RocketOutlined style={{ fontSize: "30px", color: "#08c" }} />
          </Col>
          <Col span={4}>
            <h2 style={{ color: "#08c" }}>
              <FormattedMessage id="project_name" />
            </h2>
          </Col>
          <Col span={18}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[selectedKey]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/FileDistribute">
                  <FileOutlined />
                  <FormattedMessage id="file_distribute" />
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/FileManage">
                  <FolderOutlined />
                  <FormattedMessage id="file_manage" />
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/HostManage">
                  <DesktopOutlined />
                  <FormattedMessage id="host_manage" />
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={1}>
            <Button size="small" onClick={onClickLang}>
              <FormattedMessage id="language" />
            </Button>
          </Col>
        </Row>
      </Header>
      <Content style={{ margin: "24px 16px 0" }}>
        <div
          style={{
            padding: 24,
            background: "#fff",
          }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        File distribution platform ©2019 Created by MrHeer
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
