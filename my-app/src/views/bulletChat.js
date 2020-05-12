import React, { Component } from 'react';
// import ReactCSReactCSSTransitionGroup from 'react-add'
import '../style/chat.less'
class BulletChat extends Component {
    render() {
        return (
            <div className='box'>
                <h5>弹幕</h5>
                <div className='block'>我是弹幕</div>
            </div>
        );
    }
}

export default BulletChat;