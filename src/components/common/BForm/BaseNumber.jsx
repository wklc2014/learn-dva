/**
 * 数字输入框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;

const BaseNumber = (props) => {

    const {
        className,
        label,
        layout,
        style,
        value,

        disabled,
        extra,
        id,
        min,
        max,
        onChange,
        placeholder,
        rules,
        step,
    } = props;

    const { getFieldDecorator } = props.form;

    const defaultProps = {
        disabled,
        placeholder,
        onChange: (value) => {
            props.onChange({ id, value });
        },
        style,
        min,
        max,
        step,
    };

    const ChildEle = <InputNumber {...defaultProps} />;

    return (
        <FormItem
            {...layout}
            label={label}
            className={className}
            extra={extra}
        >
            {getFieldDecorator(id, {
                rules,
                initialValue: value,
            })(ChildEle)}
        </FormItem>
    );
}

BaseNumber.propTypes = {
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,

    disabled: propTypes.bool,
    extra: propTypes.string,
    id: propTypes.string.isRequired,
    min: propTypes.number,
    max: propTypes.number,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    step: propTypes.number,
};

export default Form.create()(BaseNumber);
