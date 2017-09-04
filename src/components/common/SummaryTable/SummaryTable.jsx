import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Table } from 'antd';

class SummaryTable extends Component {
    static defaultProps = {

    }

    getDataSource = () => {
        const newDataSource = [...this.props.tableData];
        const totalData = { serial_no: '汇总: ' };
        this.props.tableHead.forEach((v) => {
            if (v.total) {
                totalData[v.dataIndex] = 0;
            }
        });
        this.props.tableData.forEach((v) => {
            Object.keys(totalData).forEach((m) => {
                if (m !== 'serial_no') {
                    totalData[m] += parseFloat(v[m]);
                }
            })
        });
        const newTotalData = {};
        Object.keys(totalData).forEach((v) => {
            if (v !== 'serial_no') {
                newTotalData[v] = parseFloat(totalData[v]).toFixed(2);
            } else {
                newTotalData[v] = totalData[v];
            }
        })
        newDataSource.push({ key: 'ts', ...newTotalData });
        return newDataSource;
    }

    render() {
        const extHead = this.props.tableHead;
        const extData = this.getDataSource();

        return (
            <Table
                rowKey="key"
                pagination={false}
                columns={extHead}
                dataSource={extData}
                bordered
            />
        )
    }
}


SummaryTable.propTypes = {
    tableHead: propTypes.array.isRequired,
    tableData: propTypes.array.isRequired,
};

export default SummaryTable;
