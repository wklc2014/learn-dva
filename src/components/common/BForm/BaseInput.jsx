/**
 * 单行文本框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

const BaseInput = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        size: 'large',
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value,
            });
        },
        style: props.style,
    };

    let ChildEle = null;
    switch (props.inputType) {
        case 'button':

            break;
        case 'radio':

            break;
        default:
            ChildEle = <Input {...defaultProps} />;
    }

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

BaseInput.propTypes = {
    className: propTypes.string,
    disabled: propTypes.bool,
    extra: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseInput;

