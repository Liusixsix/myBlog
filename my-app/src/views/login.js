import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons';

import axios from '../utils/axios'
import '../style/login.less'

const prefix = {
    UserOutlined: <UserOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
            marginRight: 5
        }}
    />,
    LockOutlined: <LockOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
            marginRight: 5
        }}
    />
}


export default function Login(props) {
    const [loading, setLoading] = useState(false)
    // console.log(props)

    const Login = (values) => {
        axios.post('/admin/login', values).then(res => {
            if (res.code !== 200) {
                message.error(res.msg)
                setLoading(false)
            }else {
                localStorage.setItem('token',res.data.token)
                props.history.replace('/admin/ArticleList')
            }
        })
    }

    const onFinish = values => {
        setLoading(true)     
        Login(values)
    };

    return (
        <div className='login'>
            <div className='login-container'>
                <h3 className='title'>系统登录</h3>
                <Form
                    size='large'
                    name="basic"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input autoComplete='off' placeholder='用户名' prefix={prefix.UserOutlined} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入用户密码！' }]}
                    >
                        <Input.Password autoComplete='off' placeholder='用户密码' prefix={prefix.LockOutlined} />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary"
                            htmlType="submit"
                            className='login-btn'
                            loading={loading}
                        >
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}