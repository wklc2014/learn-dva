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
        id,
        rules,
        value,

        layout,
        label,
        className,

        disabled,
        onChange,
        options,
        style,
    } = props;

    const { getFieldDecorator } = props.form;

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
    id: propTypes.string.isRequired,
    rules: propTypes.array,

    label: propTypes.oneOfType([
        propTypes.element,
        propTypes.string,
        propTypes.node,
    ]),
    className: propTypes.string,
    label: propTypes.string,

    disabled: propTypes.bool,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    style: propTypes.object,
};

export default Form.create()(BaseCheckbox);
