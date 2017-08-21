/**
 * 单选框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const BaseRadio = (props) => {

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

    let ChildEle = null;
    switch (props.addType) {
        case 'button':
            ChildEle = (
                <RadioGroup {...defaultProps}>
                    {props.option.map((v, i) => (
                        <RadioButton key={i} value={v.value}>{v.label}</RadioButton>
                    ))}
                </RadioGroup>
            );
            break;
        default:
            ChildEle = (
                <RadioGroup {...defaultProps}>
                    {props.option.map((v, i) => (
                        <Radio key={i} value={v.value}>{v.label}</Radio>
                    ))}
                </RadioGroup>
            );
    }

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

BaseRadio.propTypes = {
    addType: propTypes.string,
    className: propTypes.string,
    disabled: propTypes.bool,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    option: propTypes.array,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseRadio;

