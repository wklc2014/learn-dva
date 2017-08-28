import React, { Component } from 'react';
import lodash from 'lodash';
import { Form, Table, Button } from 'antd';
import FormBox from '../common/BForm/FormBox.jsx';

import * as CONFIG_POLICY from './common/';

class Policy extends Component {

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
    }

    handleClick = () => {
        const { dataSource } = this.state;
        this.setState({
            dataSource: [{ key: dataSource.length }, ...dataSource],
        })
    }

    onChange = ({ id, value, order, type, addValue }) => {
        console.log(id, value, type, addValue);
        const { dataSource } = this.state;
        const newDataSource = dataSource.map((v, i) => {
            if (v.key === order) {
                v[id] = value;
            }
            return v;
        });
        this.setState({ dataSource: newDataSource });
    }

    getTableColumns = (configs) => {
        const { getFieldDecorator } = this.props.form;
        const newColumns = [];

        if (!configs || !Object.keys(configs).length) {
            return newColumns;
        }

        Object.keys(configs).sort((m, n) => {
            if (configs[m].order > configs[n].order) {
                return 1;
            } else if (configs[m].order < configs[n].order) {
                return -1;
            } else {
                return 0;
            }
        }).forEach((v, i) => {
            const val = configs[v];
            if (val.isHide) {
                return null;
            }
            newColumns.push({
                dataIndex: v,
                key: v,
                title: val.name,
                render: (text, record) => {
                    console.log('text>>>', record.key)
                    switch (record.key) {
                        case 'ts':

                            if (i === 0) {
                                return <div style={{ textAlign: 'center' }}>汇总</div>;
                            }
                            break;
                        default:
                            const commonProps = {
                                ...val,
                                id: v,
                                getFieldDecorator,
                                onChange: ({ id, value, type, addValue }) => {
                                    this.onChange({ id, value, order: record.key, type, addValue });
                                },
                                space: 0,
                            }
                            return <FormBox {...commonProps} />;
                    }
                }
            });
        })
        return newColumns;
    }

    getTableDataSource = (configs) => {
        const { dataSource } = this.state;
        const newDataSource = [...dataSource];
        if (!newDataSource.length) {
            const needTotal = lodash.find(configs, (o) => o.total);
            const hasTs = lodash.find(newDataSource, (o) => o.key === 'ts');
            if (!hasTs && needTotal) {
                newDataSource.push({ key: 'ts' });
            }
        }
        return newDataSource;
    }

    render() {
        const newColumns = this.getTableColumns(CONFIG_POLICY.CONFIG_TABLE_HEAD);
        const newDataSource = this.getTableDataSource(CONFIG_POLICY.CONFIG_TABLE_HEAD);

        // console.log('newColumns>>>', newColumns)

        return (
            <section>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={this.handleClick}>添加</Button>
                </div>
                <Table
                    columns={newColumns}
                    dataSource={newDataSource}
                    bordered
                />
            </section>
        );
    }
}

export default Form.create()(Policy);
