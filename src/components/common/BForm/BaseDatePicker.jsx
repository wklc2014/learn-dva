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

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        style: props.style,
        format: props.format,
        showTime: props.showTime,
    };

    let ChildEle = null;
    switch (props.addType) {
        case 'range':
            ChildEle = (
                <RangePicker
                    {...defaultProps}
                    onChange={(e) => {
                        let value = [];
                        if (e.length) {
                            value = [
                                moment(e[0]).format(props.format),
                                moment(e[1]).format(props.format)
                            ];
                        }
                        props.onChange({
                            id: props.id,
                            value,
                        });
                    }}
                />
            );
            break;
        default:
            ChildEle = (
                <DatePicker
                    {...defaultProps}
                    onChange={(e) => {
                        const value = e ? moment(e).format(props.format) : undefined;
                        props.onChange({
                            id: props.id,
                            value,
                        });
                    }}
                />
            );
    }

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

