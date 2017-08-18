/**
 * 根据接口搜索生成下拉选项
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

let timeout = null;

class BaseSearch extends Component {

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {
            option: [],
            values: this.getValues(),
        }
    }

    handleFetch = (params, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        const fake = async function () {
            const resp = await caseServices.getAddressList(params);
            callback(resp.data);
        }
        timeout = setTimeout(fake, 300);
    }

    render() {
        const newValue = this.props.value;

        const defaultProps = {
            disabled: this.props.disabled,
            placeholder: this.props.placeholder,
            style: props.style,
            onSelect: (e) => {
                this.props.onChange({
                    id: this.props.id,
                    value: e
                });
            },
            onSearch: (values) => {
                if (values) {
                    const p = {
                        province: newValue.province,
                        city: newValue.city,
                        district: newValue.district,
                        tagName: values,
                    }
                    this.handleFetch(p, data => {
                        this.setState({ option: data });
                    })
                }
            },
            showSearch: this.props.showSearch,
            dropdownMatchSelectWidth: this.props.dropdownMatchSelectWidth,
            allowClear: this.props.allowClear,
            optionFilterProp: 'children',
            filterOption: this.props.filterOption,
            notFoundContent: this.props.notFoundContent,
            defaultActiveFirstOption: this.props.defaultActiveFirstOption,
        };

        const ChildEle = (
            <Select {...defaultProps}>
                {this.state.option.map((v, i) => <Option key={i}value={v}>{v}</Option>)}
            </Select>
        );



        return (
            <FormItem
                {...this.props.layout}
                label={this.props.label}
                className={this.props.className}
            >
                {this.props.getFieldDecorator(this.props.id, {
                    rules: this.props.rules,
                    initialValue: newValue.road,
                })(ChildEle)}
            </FormItem>
        );
    }
}

export default BaseSearch;
