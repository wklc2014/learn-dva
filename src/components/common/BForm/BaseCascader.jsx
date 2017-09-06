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
    const {
        className,
        label,
        layout,
        style,
        value,

        allowClear,
        disabled,
        id,
        onChange,
        options,
        placeholder,
        rules,
    } = props;

    const { getFieldDecorator } = props.form;

    const defaultProps = {
        disabled,
        placeholder,
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
            })(ChildEle)}
        </FormItem>
    );
}

BaseCascader.propTypes = {
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,

    allowClear: propTypes.bool,
    disabled: propTypes.bool,
    id: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    placeholder: propTypes.string,
    rules: propTypes.array,
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
})(BaseCascader);
