/**
 * 单选框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Radio } from 'antd';
import FormBox from './FormBox.jsx';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const BaseRadio = (props) => {
    const {
        addType,
        className,
        disabled,
        getFieldDecorator,
        id,
        label,
        layout,
        onChange,
        options,
        placeholder,
        rules,
        style,
        value,
    } = props;

    const defaultProps = {
        disabled,
        onChange: (value) => {
            onChange({ id, value });
        },
        style,
    };

    let ChildEle = null;
    switch (addType) {
        case 'button':
            ChildEle = (
                <RadioGroup {...defaultProps}>
                    {options.map((v, i) => (
                        <RadioButton key={i} value={v.value}>{v.label}</RadioButton>
                    ))}
                </RadioGroup>
            );
            break;
        default:
            ChildEle = (
                <RadioGroup {...defaultProps}>
                    {options.map((v, i) => (
                        <Radio key={i} value={v.value}>{v.label}</Radio>
                    ))}
                </RadioGroup>
            );
    }

    return (
        <FormItem
            {...layout}
            label={label}
            className={className}
        >
            {getFieldDecorator(id, {
                rules,
                initialValue: value,
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
    options: propTypes.array,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

// export default BaseRadio;
export default FormBox(BaseRadio);

