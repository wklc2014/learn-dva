import React, { Component } from 'react';
import lodash from 'lodash';
import propTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const BaseInputAdd = (props) => {

    const commonProps = {
        disabled: props.disabled,
    };
    const defaultProps = {
        ...commonProps,
        placeholder: props.placeholder,
        style: props.style,
    };

    const inputValue = lodash.get(props, 'value.inputValue', undefined);
    let addValue = lodash.get(props, 'value.addValue', undefined);
    switch (props.addType) {
        case 'before-select':
            const selectOptionEle = props.option.map((v, i) => {
                if (v.selected && !addValue) {
                    addValue = v.value;
                }
                return <Option key={i} value={v.value}>{v.label}</Option>;
            });
            const addonBeforeProps = {
                ...commonProps,
                style: { width: props.selectWidth },
                value: addValue,
                onChange: (e) => {
                    props.onChange({
                        id: props.id,
                        value: { inputValue, addValue: e },
                    });
                },
            };
            const addonBeforeEle = <Select {...addonBeforeProps}>{selectOptionEle}</Select>;
            Object.assign(defaultProps, { addonBefore: addonBeforeEle });
            break;
    }
    const ChildEle = (
        <Input
            {...defaultProps}
             onChange={(e) => {
                props.onChange({
                    id: props.id,
                    value: { inputValue: e.target.value, addValue },
                });
             }}
        />
    );

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
        >
            {props.getFieldDecorator(props.id, {
                rules: props.rules,
                initialValue: inputValue,
            })(ChildEle)}
        </FormItem>
    );
}

BaseInputAdd.propTypes = {
    addType: propTypes.string,
    className: propTypes.string,
    disabled: propTypes.bool,
    dropdownMatchSelectWidth: propTypes.bool,
    extra: propTypes.string,
     getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    option: propTypes.array.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
    selectWidth: propTypes.number,
};

export default BaseInputAdd;
