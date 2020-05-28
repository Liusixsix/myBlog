import React from 'react'

import { Form, Input, Button, Layout } from 'antd';
const { TextArea } = Input;
const layout = {
    labelCol: { span: 3 },
    wrapperCol: { offset: 2, span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 12, span: 10 },
};


function AddForm(props) {
    const onFinish = values => {
        props.addMessage(values)
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}

        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入留言用户名',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="留言信息"
                name="message"
                rules={[
                    {
                        required: true,
                        message: '请输入留言信息',
                    },
                ]}
            >
                <TextArea />
            </Form.Item>

            <Form.Item {...tailLayout} >
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddForm;