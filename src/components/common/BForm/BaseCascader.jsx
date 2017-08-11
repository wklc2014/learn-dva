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



    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e
            })
        },
        style: { width: '100%' },
        allowClear: props.allowClear,
        options: props.option,
    };

    const ChildEle = <Cascader {...defaultProps} />;

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

BaseCascader.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseCascader;

