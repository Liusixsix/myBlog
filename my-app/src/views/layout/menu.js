import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter, NavLink } from 'react-router-dom'
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined, AppstoreOutlined
} from '@ant-design/icons';
const { SubMenu } = Menu
const Menus = withRouter((props) => {
    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/admin/2']} selectedKeys={[props.location.pathname]}>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>数据</span>
                    </span>
                }
            >
                <Menu.Item key="/admin/table">
                    <NavLink to='/admin/table'>表格</NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to='/admin/board'>留言板</NavLink>
                </Menu.Item>

            </SubMenu>
            <SubMenu
                key="sub2"
                title={
                    <span>
                        <AppstoreOutlined />
                        <span>博客</span>
                    </span>
                }
            >
                <Menu.Item key="/admin/category">
                    <NavLink to='/admin/category'>
                        <span>添加分类</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/admin/addArticle">
                    <NavLink to='/admin/addArticle'>
                        <span >添加文章</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="/admin/ArticleList">
                    <NavLink to='/admin/ArticleList'>
                        <span >文章列表</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <UploadOutlined />
                    <span>nav 3</span>
                </Menu.Item>
            </SubMenu>

        </Menu>
    )
})
export default Menus;