import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import MyTable from '../Table'
import Board from '../board'
import Category from '../blog/category'
import AddArticle from '../blog/addArticle'
import ArticleList from "../blog/ArticleList"
import AddTags from '../blog/addTags'
import Luck from '../Luck'
import BookUp from '../book/bookUp'
const { Content } = Layout;


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
                    <Route path='/admin/tags' exact component={AddTags}></Route>
                    <Route path='/admin/AddArticle'  component={AddArticle}></Route>
                    <Route path='/admin/ArticleList' exact component={ArticleList}></Route>
                    {/*  */}
                    <Route path='/admin/Luck' exact component={Luck}></Route>
                     <Route path='/admin/bookUp' exact component={BookUp}></Route>
                    {/* <Redirect to='/logins'></Redirect> */}
                </Switch>
            </Content>

        )
    }
}