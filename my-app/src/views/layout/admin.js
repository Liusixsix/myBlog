import React, { Component } from 'react';
import '../../style/admin.less'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

import Content from './content'
import Menu from './menu'
const { Header, Sider } = Layout;


class Admin extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      let W = window.innerWidth
      if (W <= 1000) {
        this.setState({
          collapsed: true
        });
      }
    })
  }



  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" ></div>
          <Menu></Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>

          <Content></Content>
        </Layout>
      </Layout>
    )
  }
}

export default Admin;