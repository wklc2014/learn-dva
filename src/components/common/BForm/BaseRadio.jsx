/**
 * 单选框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const BaseRadio = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value,
            })
        },
    };

    const ChildEle = (
        <RadioGroup {...defaultProps}>
            {props.option.map((v, i) => <Radio key={i} value={v.value}>{v.label}</Radio>)}
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

BaseRadio.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseRadio;

