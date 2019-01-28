import { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';
import { FormattedMessage, formatMessage } from 'umi/locale';

const { Content, Footer } = Layout;

class BasicLayout extends Component {
    render() {
        return (
            <Layout className="layout">
              <DocumentTitle title={ formatMessage({id: 'project_name'}) }/>
              <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
                >
                <Menu.Item key="1"><Link to="/FileDistribute"><FormattedMessage id="file_distribute" /></Link></Menu.Item>
                <Menu.Item key="2"><Link to="/HostManage"><FormattedMessage id="host_manage" /></Link></Menu.Item>
              </Menu>
              <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 560 }}>
                  { this.props.children }
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                File distribution platform ©2019 Created by MrHeer
              </Footer>
            </Layout>
        )
    }
}

export default BasicLayout;
