import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import MyTable from '../Table'
import Board from '../board'
import Category from '../blog/category'
import AddArticle from '../blog/addArticle'
import ArticleList from "../blog/ArticleList"
const { Content } = Layout;


function Texts() {
    return (
        <div>545855</div>
    )
}
export default class Main extends React.Component {
    render() {
        return (
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <Switch>
                    <Route path='/admin/Table' exact component={MyTable}></Route>
                    <Route path='/admin/board' exact component={Board}></Route>
                    <Route path='/admin/Category' exact component={Category}></Route>
                    <Route path='/admin/AddArticle'  component={AddArticle}></Route>
                    <Route path='/admin/ArticleList' exact component={ArticleList}></Route>
                    {/* <Redirect to='/logins'></Redirect> */}
                </Switch>
            </Content>

        )
    }
}