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
        disabled,
        extra,
        getFieldDecorator,
        id,
        label,
        layout,
        min,
        max,
        step,
        onChange,
        placeholder,
        rules,
        style,
        value,
    } = props;

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
    disabled: propTypes.bool,
    extra: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    min: propTypes.number,
    max: propTypes.number,
    step: propTypes.number,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseNumber;
