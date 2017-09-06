/**
 * 日期选择
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import lodash from 'lodash';
import { Form, DatePicker } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const BaseDatePicker = (props) => {
    const {
        addType,
        className,
        disabled,
        format,
        getFieldDecorator,
        id,
        label,
        layout,
        onChange,
        placeholder,
        rules,
        style,
        showTime,
        value,
    } = props;

    const defaultProps = {
        disabled,
        onChange(value) {
            onChange({ id, value });
        },
        placeholder,
        style,
        format,
        showTime,
    };

    let ChildEle = null;
    switch (addType) {
        case 'range':
            ChildEle = <RangePicker {...defaultProps} />;
            break;
        default:
            ChildEle = <DatePicker {...defaultProps} />;
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

BaseDatePicker.propTypes = {
    addType: propTypes.string,
    className: propTypes.string,
    disabled: propTypes.bool,
    format: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.oneOfType([
        propTypes.string,
        propTypes.array,
    ]),
    rules: propTypes.array,
    style: propTypes.object,
    showTime: propTypes.bool,
};

export default BaseDatePicker;
