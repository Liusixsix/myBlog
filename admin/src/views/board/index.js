import React, { Component } from 'react';
import { Card, List, Avatar } from 'antd';
import axios from '../../utils/axios'

import AddForm from './form'

class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            MessageList: []
        }
    }

    componentDidMount() {
        this.fetchMessageList()
    }
    addMessage = (value) => {
        axios.post('/board/addMessage', value).then(res => {
            this.fetchMessageList()
        })
    }

    fetchMessageList() {
        axios.get('/board/getList').then(res => {
            this.setState({
                MessageList: res
            })
        })
    }

    render() {
        return (
            <Card >
                <Card>
                    <AddForm addMessage={this.addMessage}></AddForm>
                </Card>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.MessageList}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="javascript;;">{item.username}</a>}
                                description={item.message}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        );
    }
}

export default index;