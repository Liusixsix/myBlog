
import React, { Component } from 'react';
import './app.less'
import { Provider } from 'react-redux'
import Hoc from './Hoc'
import ContextText from './contextText'
import KFrom from './Form'

import RouterTest from './RouterTest'

import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './utils/Auth'
import Login from './views/login'
import Admin from './views/layout/admin'
import BulletChat from './views/bulletChat'
class App extends Component {
    state = {
        list: [
            { id: 1, count: 1, Price: 100, name: '商品1', checked: false },
            { id: 2, count: 1, Price: 100, name: '商品2', checked: false },
        ],
        Total: ''
    }


    render() {
        return (
            <div>
                {/* {
                    this.state.list.map(item => {
                        return <Item key={item.id}></Item>
                    })
                } */}
                {/* <Hoc></Hoc>
                <hr/>
                <ContextText></ContextText>
                <hr></hr>
                <KFrom></KFrom>
                <hr></hr> */}

                {/* <RouterTest></RouterTest> */}

                <Router>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <PrivateRoute path='/Admin' component={Admin}></PrivateRoute>
                        <Redirect to='/login'></Redirect>
                        <Route component={NoMatch}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;


const NoMatch = (props) => {
    console.log(props)
    return (
        <div>
            404:{props.location.pathname}
        </div>
    )
}
