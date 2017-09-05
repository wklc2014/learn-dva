/**
 * 数字输入框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;

const BaseNumber = (props) => {

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
        min: props.min,
        max: props.max,
        step: props.step,
    };

    const ChildEle = <InputNumber {...defaultProps} />;

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
            extra={props.extra}
        >
            {props.getFieldDecorator(props.id, {
                rules: props.rules,
                initialValue: props.value,
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

