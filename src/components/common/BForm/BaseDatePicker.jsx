/**
 * 日期选择
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import lodash from 'lodash';
import { Form, DatePicker } from 'antd';

const FormItem = Form.Item;

const BaseDatePicker = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            const value = e ? moment(e).format(props.format) : undefined;
            props.onChange({
                id: props.id,
                value
            });
        },
        style: { width: '100%' },
        format: props.format,
        showTime: props.showTime,
    };

    const ChildEle = <DatePicker {...defaultProps} />;

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

export default BaseDatePicker;

