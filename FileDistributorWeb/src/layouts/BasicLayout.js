import { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import { Link } from 'umi';
import { FormattedMessage, formatMessage, getLocale, setLocale } from 'umi/locale';
import DocumentTitle from 'react-document-title';

const { Header, Content, Footer } = Layout;

class BasicLayout extends Component {

    // change the language
    changLang() {
        const locale = getLocale();
        if (!locale || locale === 'zh-CN') {
            setLocale('en-US');
        } else {
            setLocale('zh-CN');
        }
   }

    render() {
        return (
            <Layout className="layout">
              <DocumentTitle title={ formatMessage({id: 'project_name'}) }/>
              <Header style={{ background: '#fff' }}>
                <Row>
                  <Col span={1}><Icon type="rocket" style={{ fontSize: '30px', color: '#08c' }} /></Col>
                  <Col span={4}><h2 style={{ color: '#08c' }}><FormattedMessage id="project_name" /></h2></Col>
                  <Col span={18}>
                    <Menu
                      theme="light"
                      mode="horizontal"
                      defaultSelectedKeys={['1']}
                      style={{ lineHeight: '64px' }}
                      >
                      <Menu.Item key="1"><Link to="/FileDistribute"><Icon type="file" /><FormattedMessage id="file_distribute" /></Link></Menu.Item>
                      <Menu.Item key="2"><Link to="/HostManage"><Icon type="desktop" /><FormattedMessage id="host_manage" /></Link></Menu.Item>
                    </Menu>
                  </Col>
                  <Col span={1}>
                    <Button size="small"
                            onClick={() => {
                                this.changLang();
                      }}>
                      <FormattedMessage id="language" />
                    </Button>
                  </Col>
                </Row>
              </Header>
              <Content  style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff'}}>
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
