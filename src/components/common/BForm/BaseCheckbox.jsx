/**
 * 复选框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const BaseCheckbox = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e
            })
        },
        options: props.option,
        style: props.style,
    };

    const ChildEle = <CheckboxGroup {...defaultProps} />;

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

BaseCheckbox.propTypes = {
    className: propTypes.string,
    disabled: propTypes.bool,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    option: propTypes.array.isRequired,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseCheckbox;

