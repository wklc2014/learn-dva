/**
 * 单选按钮
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const BaseRadioButton = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value,
            })
        },
        style: props.style,
    };

    const ChildEle = (
        <RadioGroup {...defaultProps}>
            {props.option.map((v, i) => <RadioButton key={i} value={v.value}>{v.label}</RadioButton>)}
        </RadioGroup>
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

BaseRadioButton.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseRadioButton;

