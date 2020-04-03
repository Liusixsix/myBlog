import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from '../utils/axios'

class Login extends Component {


    onFinish = values => {
        console.log('Success:', values);
        localStorage.setItem('token',123)
        this.props.history.push('/admin')
    };

    componentDidMount(){
        // axios.post('/',{name:'ss'})
    }

    render() {
        return (
            <div>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}

                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                       </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Login;