/**
 * 级联选择
 * 增加【北京】【上海】【全国】城市选择
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Cascader } from 'antd';

const FormItem = Form.Item;

const BaseCascader = (props) => {
    console.log('BaseCascader render');

    const {
        allowClear,
        className,
        disabled,
        getFieldDecorator,
        id,
        label,
        layout,
        onChange,
        options,
        placeholder,
        rules,
        style,
        value,
    } = props;

    const defaultProps = {
        disabled,
        placeholder,
        onChange: (value) => {
            onChange({ id, value });
        },
        options,
        style,
        allowClear,
    };

    const ChildEle = <Cascader {...defaultProps} />;

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

BaseCascader.propTypes = {
    allowClear: propTypes.bool,
    className: propTypes.string,
    disabled: propTypes.bool,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseCascader;
