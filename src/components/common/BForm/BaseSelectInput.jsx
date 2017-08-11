import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const BaseSelectInput = (props) => {

    let initialValue = props.value.selectValue;
    const selectOptionEle = props.option.map((v, i) => {
        if (v.selected && !props.value.selectValue) {
            initialValue = v.value;
        }
        return <Option key={i} value={v.value}>{v.label}</Option>;
    });

    const addonBeforeProps = {
        style: { width: props.selectWidth },
        value: initialValue,
        disabled: props.disabled,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: [props.value.inputValue, e],
            });
        },
    }

    const addonBeforeEle = <Select {...addonBeforeProps}>{selectOptionEle}</Select>;

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: [e.target.value, initialValue],
            });
        },
        addonBefore: addonBeforeEle
    };

    const ChildEle = <Input {...defaultProps} />;

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
        >
            {props.getFieldDecorator(props.id, {
                rules: props.rules,
                initialValue: props.value.inputValue,
            })(ChildEle)}
        </FormItem>
    );
}

BaseSelectInput.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseSelectInput;
