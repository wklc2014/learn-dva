/**
 * 下拉选择框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const BaseSelect = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e,
            })
        },
        style: props.style,
        dropdownMatchSelectWidth: props.dropdownMatchSelectWidth,
        allowClear: props.allowClear,
        mode: props.mode,
    };

    const ChildEle = (
        <Select {...defaultProps}>
            {props.option.map((v, i) => {
                return <Option key={i} value={v.value}>{v.label}</Option>;
            })}
        </Select>
    );

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
        >
            {props.getFieldDecorator(props.id, {
                rules: props.rules,
                initialValue: props.value,
            })(ChildEle)}
        </FormItem>
    );
}

BaseSelect.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseSelect;

