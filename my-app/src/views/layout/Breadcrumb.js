import React, { Component, useEffect, useState, useCallback } from 'react';
import { Breadcrumb } from 'antd'
import { withRouter, NavLink, Link } from 'react-router-dom'

const breadcrumbNameMap = {
    '/admin': '首页',
    '/admin/table': '表格',
    '/admin/board': '留言板',
    '/admin/category': '添加分类',
    '/admin/addArticle': '添加文章',
    '/admin/tags':'添加标签',
    '/admin/ArticleList': '文章列表',
}



let pathSnippets = []
const Breadcrumbs = withRouter(props => {
    const getPath = () => {
        pathSnippets = props.location.pathname.split('/').filter(i => i)
    }

    getPath()

    return (
        <div className='Breadcrumb'>
            <Breadcrumb>
                {
                    pathSnippets.map((item, index) => {
                        let url = `/${pathSnippets.slice(0, index + 1).join('/')}`
                        return (
                            <Breadcrumb.Item key={url}>

                                <Link to={url}>{breadcrumbNameMap[url]}</Link>
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        </div>
    );
})

export default Breadcrumbs;