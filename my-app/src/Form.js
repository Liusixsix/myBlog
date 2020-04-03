import React, { Component } from 'react';
import { Input, Button } from 'antd'

// 创建高级组件 扩展现有表单 事件处理 数据收集 效验

function KFormCreate(Comp) {

    return class extends React.Component {
        constructor(props) {
            super(props)
            this.options = {};
            this.state = {}
        }
        handleChange = (e) => {
            const { name, value } = e.target;
            this.setState({ [name]: value }, () => {
                // 确保值发生变化在校验
                this.validateField(name)
            })
        }

        validateField = field => {
            const rules = this.options[field].rules;
            // 任意一个失败返回false
            const ret = ! rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {
                        // 校验失败
                        this.setState({
                            [field + 'Message']: rule.message
                        })
                        return true
                    }
                }
            })
            if (ret) {
                this.setState({
                    [field + 'Message']: ''
                })
            }
            return ret
        }

        // 校验所有字段
        validate = cb => {
            const rets = Object.keys(this.options).map(field => this.validateField(field))
            const ret = rets.every(v => v === true)
            cb(ret, this.state)
        }

        // 创建input包装器
        getFieldDec = (field, option) => {
            this.options[field] = option;
            return InputComp => (
                <div>
                    {React.cloneElement(InputComp, {
                        name: field,
                        value: this.state[field] || '',
                        onChange: this.handleChange,
                    })}
                    {/* 校验的错误信息 */}
                    {this.state[field + 'Message'] && (
                        <p style={{ color: 'red' }}>{this.state[field + 'Message']}</p>
                    )}
                </div>
            )
        }

        render() {
            return <Comp getFieldDec={this.getFieldDec} validate={this.validate}></Comp>
        }
    }
}



class Form extends Component {
    onSubmit = () => {
        this.props.validate((isValid, data) => {
            console.log(data)
            if (isValid) {
                console.log('提交成功')
            } else {
                alert('校验失败')
            }
        })
    }

    render() {
        const { getFieldDec } = this.props;
        return (
            <div>
                {getFieldDec('uname', {
                    rules: [{ required: true, message: '用户名必填' }]
                })(<Input></Input>)
                }
                {getFieldDec('pwd', {
                    rules: [{ required: true, message: '密码必填' }]
                })(<Input type='password'></Input>)
                }
                <Button onClick={this.onSubmit}>按钮</Button>
            </div>
        );
    }
}
const Froms = KFormCreate(Form)
function NewForm() {
    return <Froms></Froms>
}

export default NewForm;