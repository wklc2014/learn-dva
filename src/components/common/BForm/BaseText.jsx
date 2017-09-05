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
        style: props.style,
    };

    const ChildEle = <span {...defaultProps}>{props.value}</span>;

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

BaseText.propTypes = {
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,
};


export default BaseText;

