import React, { Component } from 'react';
import lodash from 'lodash';
import propTypes from 'prop-types';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

const BaseInputAdd = (props) => {

    const {
        className,
        label,
        layout,
        style,
        value,

        addType,
        childGutter,
        childSpan,
        disabled,
        dropdownMatchSelectWidth,
        extra,
        id,
        onChange,
        options,
        placeholder,
        rules,
        selectWidth,
        toUpperCase,
        toLowerCase,
    } = props;

    const { getFieldDecorator } = props.form;

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
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,

    addType: propTypes.string,
    childGutter: propTypes.number,
    childSpan: propTypes.object,
    disabled: propTypes.bool,
    dropdownMatchSelectWidth: propTypes.bool,
    extra: propTypes.string,
    id: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    selectWidth: propTypes.number,
    toUpperCase: propTypes.bool,
    toLowerCase: propTypes.bool,
};

export default Form.create()(BaseInputAdd);
