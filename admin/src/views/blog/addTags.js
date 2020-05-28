import React, { Component } from 'react';
import { Form, Input, Button, Message, Card, Table, Skeleton } from 'antd';
import axios from '../../utils/axios'
const { Column } = Table;
class AddTags extends Component {
    state = {
        data: [],
        loading: true,
    }
    componentDidMount() {
        this.setState({
            loading: false
        })
        // this.fetch()
    }
    render() {
        const rowKey = function (record) {
            return record._id
        }
        const { loading } = this.state;
        return (
            <div>
                <Skeleton active loading={loading} >
                    <Form
                        layout="inline"
                        name="basic"

                        hideRequiredMark
                        style={{ marginBottom: 30 }}
                    >
                        <Form.Item
                            label="添加标签"
                            name="tag"
                            rules={[{ required: true, message: '请先添加分类' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                添加
                     </Button>
                        </Form.Item>
                    </Form>

                    <Card title="标签列表">
                        <Table
                            bordered
                            rowKey={rowKey}

                            dataSource={this.state.data} >
                            <Column title="name" dataIndex="name" key="name" />

                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <span>
                                        <a onClick={() => this.deletes(record._id)}>删除</a>
                                    </span>
                                )}
                            />
                        </Table>
                    </Card>
                </Skeleton>
            </div>
        );
    }
}

export default AddTags;