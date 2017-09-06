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
    const {
        className,
        disabled,
        getFieldDecorator,
        id,
        label,
        layout,
        onChange,
        options,
        rules,
        style,
        value,
    } = props;

    const defaultProps = {
        disabled,
        onChange: (value) => {
            onChange({ id, value });
        },
        options,
        style,
    };

    const ChildEle = <CheckboxGroup {...defaultProps} />;

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

BaseCheckbox.propTypes = {
    className: propTypes.string,
    disabled: propTypes.bool,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseCheckbox;
