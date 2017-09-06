import React, { Component } from 'react';
import lodash from 'lodash';
import propTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const BaseInputAdd = (props) => {
    const {
        addType,
        className,
        childGutter,
        childSpan,
        disabled,
        dropdownMatchSelectWidth,
        extra,
        getFieldDecorator,
        id,
        label,
        layout,
        onChange,
        options,
        placeholder,
        rules,
        selectWidth,
        style,
        value,
    } = props;

    const commonProps = {
        disabled,
    };

    const defaultProps = {
        ...commonProps,
        placeholder,
        style,
    };

    const inputValue = lodash.get(value, 'inputValue', undefined);
    let addValue = lodash.get(value, 'addValue', undefined);
    switch (addType) {
        case 'before-select':
            const selectOptionEle = options.map((v, i) => {
                if (v.selected && !addValue) {
                    addValue = v.value;
                }
                return <Option key={i} value={v.value}>{v.label}</Option>;
            });
            const addonBeforeProps = {
                ...commonProps,
                style: { width: selectWidth },
                value: addValue,
                onChange: (e) => {
                    onChange({
                        id,
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
                onChange({
                    id,
                    value: { inputValue: e.target.value, addValue },
                });
             }}
        />
    );

    return (
        <FormItem
            {...layout}
            label={label}
            className={className}
        >
            {getFieldDecorator(id, {
                rules,
                initialValue: inputValue,
            })(ChildEle)}
        </FormItem>
    );
}

BaseInputAdd.propTypes = {
    addType: propTypes.string,
    className: propTypes.string,
    childGutter: propTypes.number,
    childSpan: propTypes.object,
    disabled: propTypes.bool,
    dropdownMatchSelectWidth: propTypes.bool,
    extra: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    selectWidth: propTypes.number,
    style: propTypes.object,
};

export default BaseInputAdd;
