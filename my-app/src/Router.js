import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './views/login/'
import Layout from './views/Layout/main'
import AuthRoute from './views/AuthRoute'

function router() {
    return (
        <Router>
            <Route path='/' exact component={Login} ></Route>
            <AuthRoute path='/admin' component={Layout} ></AuthRoute>
        </Router>
    )
}

export default router