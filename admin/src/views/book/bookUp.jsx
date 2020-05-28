import React, { Component } from 'react';
import { Upload, message, Button, Card, Form, Input, Row, Col, Tree } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { TreeNode } = Tree;
const props = {
    name: 'file',
    accept: 'application/epub+zip',
    action: 'http://localhost:3000/upbook',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },

};

class BookUp extends Component {

    state = {
        initialValues: {}
    }

    onChange = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            this.setState({
                initialValues: info.file.response.data
            })
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    changeTitle = (array) => {
        if (!array) return;
        array.forEach((element, index) => {
            element.title = element.label
            element.key = element.label + index
            delete element.label
            if (element.children && element.children.length > 0) {
                this.changeTitle(element.children)
            }
        })
    }

    handleSelect = (selectedKeys, { selected, selectedNodes, node, event }) => {
        console.log(selectedKeys, selected, selectedNodes)
        window.open(selectedNodes[0].text)
    }

    render() {
        const { initialValues } = this.state;
        console.log(this.changeTitle(initialValues.contents));

        return (
            <div>
                <Card title="电子书上传" style={{ width: '90%', margin: 'auto' }}>
                    <Upload {...props} onChange={this.onChange}>
                        <Button>
                            <UploadOutlined />点击上传
                        </Button>
                    </Upload>

                    <Form initialValues={{
                        author: initialValues.author,
                        title: initialValues.title,
                    }} >
                        {initialValues.author}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name='author'
                                    rules={[{ required: true, message: 'Street is required' }]}
                                >
                                    <Input placeholder="作者" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name='title'
                                    rules={[{ required: true, message: 'Street is required' }]}
                                >
                                    <Input placeholder="书名" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Tree
                            title='label'
                            checkable={false}
                            onSelect={this.handleSelect}
                            treeData={initialValues.contents}
                        />
                    </Form>
                </Card>
            </div>
        );
    }
}

export default BookUp;