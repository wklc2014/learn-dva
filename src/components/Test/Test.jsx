import React, { Component } from 'react';
import { Table, Button } from 'antd';
import lodash from 'lodash';

const dataSource = [{
    key: 'system',
    type: '系统',
    one: 3,
    two: 12,
    three: 24,
    four: 24,
    five: 24,
    six: 24,
    seven: 12,
    eight: 3,
}, {
    key: 2,
    type: '一号正常买法',
    one: 5,
    two: 2,
    three: 1,
    four: 1,
    five: 1,
    six: 1,
    seven: 2,
    eight: 5,
}, {
    key: 3,
    type: '二号买法',
    one: 5,
    two: 1,
    three: 1,
    four: 1,
    five: 1,
    six: 1,
    seven: 1,
    eight: 5,
}, {
    key: 4,
    type: '三号买法',
    one: 5,
    two: 2,
    three: 1,
    four: 1,
    five: 1,
    six: 1,
    seven: 1,
    eight: 5,
}];

class Assess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [2],
            dataSource: dataSource,
            add: {
                key: 'add',
                type: '运算结果',
                one: '',
                two: '',
                three: '',
                four: '',
                five: '',
                six: '',
                seven: '',
                eight: '',
            },
        }
    }

    getDataSource = () => {
        const { add, dataSource } = this.state;
        const newData = [...dataSource];
        newData.push(add);
        return newData;
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    handleClick = () => {
        const { selectedRowKeys, add, dataSource } = this.state;
        const keys = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
        // console.log('selectedRowKeys>>>', selectedRowKeys)
        if (selectedRowKeys.length) {
            const newDataSource = dataSource.filter((v) => lodash.indexOf(selectedRowKeys, v.key) !== -1);
            const system = dataSource.filter((v) => v.key === 'system')[0];
            let xiaZhu = 0;
            const kai = {
                one: 0,
                two: 0,
                three: 0,
                four: 0,
                five: 0,
                six: 0,
                seven: 0,
                eight: 0,
            };
            newDataSource.forEach((m) => {
                keys.forEach((v) => {
                    xiaZhu += m[v];
                    kai[v] += system[v] * m[v];
                })
            })
            keys.forEach((v) => {
                let t = '无';
                const s = xiaZhu - kai[v];
                if (s > 0) {
                    t = '亏';
                } else if (s < 0) {
                    t = '赢';
                }
                add[v] = (
                    <div>
                        <p>{`下：${xiaZhu * 10}万`}</p>
                        <p>{`开：${kai[v] * 10}万`}</p>
                        <p>{`${t}：${Math.abs(s) * 10}万`}</p>
                    </div>
                );
            })

            this.setState({ add })
        } else {
            alert('请选择一行数据');
        }
    }

    render() {
        const columns = [
            { width: '10%', title: '买法', dataIndex: 'type', key: 'type' },
            { width: '10%', title: 1, dataIndex: 'one', key: 'one' },
            { width: '10%', title: 2, dataIndex: 'two', key: 'two' },
            { width: '10%', title: 3, dataIndex: 'three', key: 'three' },
            { width: '10%', title: 4, dataIndex: 'four', key: 'four' },
            { width: '10%', title: 5, dataIndex: 'five', key: 'five' },
            { width: '10%', title: 6, dataIndex: 'six', key: 'six' },
            { width: '10%', title: 7, dataIndex: 'seven', key: 'seven' },
            { width: '10%', title: 8, dataIndex: 'eight', key: 'eight' },
        ]


        const dataSource = this.getDataSource();

        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: (record) => {
                return { disabled: (record.key === 'system' || record.key === 'add') }
            }
        }

        return (
            <div>
                <div style={{ marginBottom: 24 }}>
                    <Button onClick={this.handleClick} type="primary">
                        运算
                    </Button>
                </div>
                <Table
                    rowKey="key"
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
}

export default Assess;
