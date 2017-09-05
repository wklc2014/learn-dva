/**
 * 下拉选择框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Select } from 'antd';
import FormBox from './FormBox.jsx';

const FormItem = Form.Item;
const Option = Select.Option;

const BaseSelect = (props) => {
    const {
        allowClear,
        className,
        disabled,
        dropdownMatchSelectWidth,
        extra,
        getFieldDecorator,
        id,
        label,
        layout,
        mode,
        onChange,
        options,
        placeholder,
        rules,
        style,
        value,
    } = props;

    const defaultProps = {
        disabled,
        placeholder,
        onChange: (value) => {
            onChange({ id, value });
        },
        style,
        dropdownMatchSelectWidth,
        allowClear,
        mode,
    };

    const ChildEle = (
        <Select {...defaultProps}>
            {options.map((v, i) => {
                return <Option key={i} value={v.value}>{v.label}</Option>;
            })}
        </Select>
    );

    return (
        <FormItem
            {...layout}
            label={label}
            className={className}
        >
            {getFieldDecorator(id, {
                rules,
                initialValue: value,
            })(ChildEle)}
        </FormItem>
    );
}

BaseSelect.propTypes = {
    allowClear: propTypes.bool,
    className: propTypes.string,
    disabled: propTypes.bool,
    dropdownMatchSelectWidth: propTypes.bool,
    extra: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    mode: propTypes.string,
    onChange: propTypes.func.isRequired,
    options: propTypes.array,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

// export default BaseSelect;
export default FormBox(BaseSelect);

