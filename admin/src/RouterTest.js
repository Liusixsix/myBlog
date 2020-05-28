import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'

function Home() {
    return <div>
        <h3>列表</h3>
        <ul>
            <li><Link to='/detail/web'>web</Link></li>
            <li><Link to='/detail/node'>node</Link></li>
        </ul>
    </div>
}
function About() {
    return <div>
        <h3>个人信息</h3>
        <div>
            <Link to='/about/me'>个人信息</Link>
            <Link to='/about/order'>订单查询</Link>
        </div>
        <Switch>
            <Route path='/about/me' component={() => (<div>me</div>)}></Route>
            <Route path='/about/order' component={() => (<div>订单</div>)}></Route>
            <Redirect to='/about/me'></Redirect>
        </Switch>
    </div>
}
function Detail(props) {
    console.log(props)
    return <div>Detail:{props.match.params.course}</div>
}
function NoMatch(props) {
    console.log(props)
    return <div>404:{props.location.pathname}不存在</div>
}

// 路由守卫
// <PrivateRoute path='' componet> 
function PrivateRoute({ component: Comp, isLogin = true, ...rest }) {
    return (
        // render:动态渲染组件
        <Route {...rest} render={
            props => isLogin ? (<Comp />) : (<Redirect to={{ pathname: '/login', state: props.location.pathname }} />)}></Route>
    )
}

function Login({ location, isLogin, history }) {
    const redirect = location.state || '/';
    if (isLogin) {
        return <Redirect to={redirect}></Redirect>
    }
    return (
        <div>
            <p>登录</p>
            <button onClick={() => history.push('/detail/:course')}>登录</button>
        </div>
    )
}


class RouterTest extends Component {
    render() {
        return (
            <div>
                <Router>
                    <ul>
                        <li>
                            <Link to='/'>首页</Link>
                            <Link to='/about'>关于</Link>
                        </li>
                    </ul>
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/detail/:course' component={Detail}></Route>
                        <Route path='/login' component={Login}></Route>
                        <PrivateRoute path='/about' component={About}></PrivateRoute>
                        {/* 404 没有path 必然匹配 */}
                        <Route component={NoMatch}></Route>
                    </Switch>

                </Router>
            </div>
        );
    }
}

export default RouterTest;