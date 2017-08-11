/**
 * 日期区间选择
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';
import lodash from 'lodash';
import { Form, DatePicker } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const BaseDateRange = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            let value = undefined;
            if (e) {
                value = [moment(e[0]).format(props.format), moment(e[1]).format(props.format)]
            }
            props.onChange({
                id: props.id,
                value
            })
        },
        style: { width: '100%' },
        format: props.format,
        showTime: props.showTime,
    };

    const ChildEle = <RangePicker {...defaultProps} />;

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

export default BaseDateRange;

