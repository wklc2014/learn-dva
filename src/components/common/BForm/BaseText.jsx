/**
 * 文本显示
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

const BaseText = (props) => {

    const defaultProps = {
        className: 'ant-form-text',
    };

    let newValue = props.value;

    if (props.render) {
        // 配置render函数
        newValue = props.render(props.value);
    } else if (props.isDate) {
        // 日期
        newValue = moment(props.value).format(props.format);
    }  else if (lodash.isArray(props.value)) {
        // 数组
        newValue = props.value.join(props.join);
    } else if (props.option){
        // 枚举值映射
        props.option.some((v) => {
            if (v.value === props.value) {
                newValue = v.label;
            }
            return v.value === props.value;
        })
    }

    const ChildEle = <span {...defaultProps}>{newValue}</span>;

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
        >
            {ChildEle}
        </FormItem>
    );
}

export default BaseText;

