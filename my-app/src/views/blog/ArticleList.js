import React, { Component } from 'react';
import { Form, Input, Button, Message, Card, Table } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from '../../utils/axios'
const { Column } = Table;

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArticleList: []
        }
    }
    componentDidMount() {
        this.fetchList()
    }

    fetchList = () => {
        axios.get('/admin/Article').then(res => {
            this.setState({
                ArticleList: res
            })
        })
    }
    // 删除文章
    deletes = (id) => {
        axios.delete(`/admin/Article/${id}`).then(res => {
            if (res) {
                Message.success('删除成功')
                this.fetchList()
            }
        })
    }
    render() {
        const rowKey = function (record) {
            return record._id
        }
        return (
            <div>
                <Card title='文章列表'>
                    <Table
                        bordered
                        rowKey={rowKey}
                        dataSource={this.state.ArticleList} >
                        <Column title="title" dataIndex="title" key="title" />
                        <Column title="浏览量" dataIndex="Browse" key="Browse" />
                        <Column title="所属分类"
                            dataIndex="Category"
                            render={(text, record) => (
                                <a>{record.Category && record.Category.name}</a>
                            )}
                        />
                        <Column title="发表时间"
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
                                    <Link to={{pathname:'/admin/AddArticle',query:record._id}}>查看</Link>
                                    <a style={{ marginLeft: 15 }} onClick={() => this.deletes(record._id)}>删除</a>
                                </span>
                            )}
                        />
                    </Table>
                </Card>
            </div>
        );
    }
}

export default ArticleList;