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
    };

    const ChildEle = <Input {...defaultProps} />;

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

export default BaseInput;

