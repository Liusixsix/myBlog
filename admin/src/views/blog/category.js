import React, { Component } from 'react';
import moment from 'moment'
import { Form, Input, Button, Message, Card, Table, Skeleton } from 'antd';
import axios from '../../utils/axios'

const { Column } = Table;

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading:true
        }
    }
    componentDidMount() {
        this.setState({
            loading: false
        })
        this.fetch()
    }

    onFinish = (values) => {
        axios.post('/admin/addCategory', values).then(res => {
            if (res) {
                Message.success('添加成功')
                this.fetch()
            }
        })
    }

    fetch = () => {
        axios.get('/admin').then(res => {
            this.setState({
                data: res
            })
        })
    }

    deletes = (id) => {
        axios.delete(`/admin/Category/${id}`).then(res => {
            if (res) {
                Message.success('删除成功')
                this.fetch()
            }
        })
    }

    render() {
        const rowKey = function (record) {
            return record._id
        }
        return (
            <div>
                <Skeleton active  loading={this.state.loading} >
                    <Form
                        layout="inline"
                        name="basic"
                        onFinish={this.onFinish}
                        hideRequiredMark
                        style={{ marginBottom: 30 }}
                    >
                        <Form.Item
                            label="分类名称"
                            name="name"
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

                    <Card title="分类列表">
                        <Table
                            bordered
                            rowKey={rowKey}

                            dataSource={this.state.data} >
                            <Column title="name" dataIndex="name" key="name" />
                            <Column title="created"
                                dataIndex="created"
                                key="created"
                                render={(text, record) => (
                                    <a>{moment(record.created).format('YYYY-MM-DD HH:mm')}</a>
                                )}
                            />
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

export default Category;