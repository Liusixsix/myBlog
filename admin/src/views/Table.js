import React, { Component } from 'react';
import { Card, Table, Radio } from 'antd';

import axios from '../utils/axios'
const columns = [
    {
        title: "商品名称",
        dataIndex: "warename",
        width: 250,
        tooltip: true,
        key: 'warename'
    },
    {
        title: "销售单号",
        dataIndex: "saleno",
        width: 200,
        key: 'saleno'
    },
    {
        title: "订单编号",
        dataIndex: "orderno",
        width: 200,
        key: 'orderno'
    },
    {
        title: "业务时间",
        dataIndex: "bizTime",
        width: 170,
        key: 'bizTime'
    },
    {
        title: "毛利",
        dataIndex: "grossProfit",
        width: 100,
        key: 'grossProfit'
    },
    {
        title: "利润",
        dataIndex: "profit",
        width: 100,
        key: 'profit'
    },
    {
        title: "负责人",
        dataIndex: "person",
        width: 150,
        key: 'person'
    },
    {
        title: "运营",
        dataIndex: "operator",
        width: 100,
        key: 'operator'
    },
    {
        title: "薪资",
        dataIndex: "salary",
        width: 110,
        key: 'salary'
    }
]

class MyTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            loading: true,
            currentId: null
        }
    }
    componentDidMount() {
        this.fetch()
    }

    fetch() {
        axios.get('/operate/itemsSoldHydee/getItemsSoldProfitHydee').then(res => {
            this.setState({
                loading: false,
                data: res.data.list,
                total: res.data.total
            })
        }).catch(err => {
            this.setState({
                loading: false
            })
        })
    }
    changePage = (current) => {
        console.log(current);
    }

    render() {
        const paginationProps = {
            showSizeChanger: false,
            showQuickJumper: false,
            pageSize: 10,
            current: 1,
            total: this.state.total,
            showTotal: () => `共 ${this.state.total} 条`,
            onChange: (current) => this.changePage(current)
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            columnTitle: "选择",
            getCheckboxProps: record => ({
                disabled: record.id === '2',
                name: record.warename,
            }),
        };
        const rowKey = function (record) {
            return record.id
        }
        return (
            <div>
                <Card title="表格">
                    <Table
                        rowSelection={{
                            type: 'radio',
                            fixed: 'left',
                            ...rowSelection
                        }}

                        loading={this.state.loading}
                        columns={columns}
                        dataSource={this.state.data}
                        bordered
                        rowKey={rowKey}
                        pagination={paginationProps}
                    />
                </Card>
            </div>
        );
    }
}

export default MyTable;