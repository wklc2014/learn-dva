/**
 * 多行文本输入框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Input } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const BaseTextArea = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value,
            })
        },
        rows: props.rows,
    };

    const ChildEle = <TextArea {...defaultProps} />;

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

export default BaseTextArea;

