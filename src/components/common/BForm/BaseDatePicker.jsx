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
        className,
        label,
        layout,
        style,
        value,

        addType,
        disabled,
        format,
        id,
        onChange,
        placeholder,
        rules,
        showTime,
    } = props;

    const { getFieldDecorator } = props.form;

    const defaultProps = {
        disabled,
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
            })(ChildEle)}
        </FormItem>
    );
}

BaseDatePicker.propTypes = {
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,

    addType: propTypes.string,
    disabled: propTypes.bool,
    format: propTypes.string,
    id: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    placeholder: propTypes.oneOfType([
        propTypes.string,
        propTypes.array,
    ]),
    rules: propTypes.array,
    showTime: propTypes.bool,
};

export default Form.create({
    onFieldsChange(props, fields) {
        const id = Object.keys(fields)[0];
        const { validating, value } = fields[id];
        if (!validating) {
            props.onChange({ id, value });
        }
    },
    mapPropsToFields(props) {
        const { id, value } = props;
        return { [id]: { value } }
    }
})(BaseDatePicker);
