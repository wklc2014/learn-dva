import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Table } from 'antd';

class SummaryTable extends Component {
    static defaultProps = {

    }

    getDataSource = () => {
        const newDataSource = [...this.props.tableData];
        const hasTs = lodash.find(newDataSource, (o) => o.key === 'ts');
        const totalData = { serial_no: '汇总: ' };
        this.props.tableHead.forEach((v) => {
            if (v.total) {
                totalData[v.dataIndex] = 0;
            }
        });
        this.props.tableData.forEach((v) => {
            Object.keys(totalData).forEach((m) => {
                if (m !== 'serial_no') {
                    totalData[m] += lodash.round(v[m], 2);
                }
            })
        });
        if (!hasTs) {
            newDataSource.push({ key: 'ts', ...totalData });
        }
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
