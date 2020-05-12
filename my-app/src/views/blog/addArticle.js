import React, { Component } from 'react';
import { Form, Button, Message, Card, Select, Input } from 'antd';
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import axios from '../../utils/axios'
const { Option } = Select;
class AddArticle extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            categoryList: [],
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState(null),
            details: null,//富文本回显信息存储
        }
    }
    componentDidMount() {
        this.fetchSelect()
        this.props.location.query && this.Echodisplay()
    }
    // 回显
    Echodisplay = () => {
        axios.get(`/admin/ArticleById/${this.props.location.query}`).then(res => {
            this.formRef.current.setFieldsValue({
                title: res.title,
                Category: res.Category._id,
            });
            this.setState({
                details: BraftEditor.createEditorState(res.content)
            })
        })

    }
    fetchSelect = () => {
        axios.get('/admin').then(res => {
            this.setState({
                categoryList: res
            })
        })
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        console.log(htmlContent)
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (details) => {
        this.setState({ details })
    }

    onFinish = (values) => {
        // console.log(this.state.details.toText())
        let params = { ...values, content: this.state.details.toText() }
        if (this.props.location.query) {
            axios.post(`/admin/uptateById/${this.props.location.query}`, params).then(res => {
                if (res) {
                    Message.success('修改成功')
                }
            })
        } else {
            axios.post('/admin/addArticle', params).then(res => {
                Message.success('添加成功')
                this.formRef.current.setFieldsValue({
                    title: '',
                    Category: ''
                });
            })
        }

    }

    render() {
        const { categoryList, editorState, details } = this.state
        return (
            <div>
                <Card title="新建文章">
                    <Form
                        ref={this.formRef}
                        style={{ width: '100%' }}
                        name="basic"
                        hideRequiredMark
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            label="文章分类"
                            name="Category"
                            rules={[{ required: true, message: '请先添加分类' }]}
                        >
                            <Select style={{ width: '150px' }}>
                                {
                                    categoryList.map(item => {
                                        return <Select.Option key={item._id} value={item._id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="文章标题"
                            name="title"
                            rules={[{ required: true, message: '请先添加分类' }]}
                        >
                            <Input></Input>
                        </Form.Item>

                        <Form.Item label='标签' name='tag'>
                            <Select style={{ width: '150px' }}>
                                <Select.Option value="Demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item

                        >
                            <BraftEditor
                                value={details}
                                onChange={this.handleEditorChange}
                                onSave={this.submitContent}
                            />

                        </Form.Item>

                        <Form.Item >
                            {
                                this.props.location.query ? <Button type="primary" htmlType="submit">修改</Button> : <Button type="primary" htmlType="submit">
                                    添加
                      </Button>
                            }

                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}


export default AddArticle;