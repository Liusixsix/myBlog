import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { message } from 'antd';
// 权限路由
function PrivateRoute({ component: Comp, ...rest }) {
    const isLogin = localStorage.getItem('token')
    if (!isLogin) {
        message.error('请先登录')
    }
    return (
        <Route {...rest} render={
            props => isLogin ? (<Comp />) : (<Redirect to={{ pathname: '/', state: props.location.pathname }} />)}></Route>
    )
}

export default PrivateRoute