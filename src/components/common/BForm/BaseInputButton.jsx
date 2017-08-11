/**
 * 单行文本输入框 + 按钮组
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import classnames from 'classnames';
import { Form, Input, Button, Row, Col, Cascader } from 'antd';
import { CHINESE_CITYS } from './utils/ChineseCities.js';

const FormItem = Form.Item;

const BaseInputButton = (props) => {

    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        size: 'large',
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value
            })
        },
    };

    const ChildEle = <Input {...defaultProps} />;

    const btnEle = props.option.map((v, i) => {
        const style = {};
        if (i < props.option.length - 1) {
            style.marginRight = '8px';
        }

        const btnProps = {
            key: i,
            type: v.type,
            size: 'large',
            style,
            disabled: props.disabled,
        };

        if (v.value === 'city') {
            return (
                <Cascader
                    key={i}
                    options={CHINESE_CITYS}
                    onChange={(value) => {
                        props.onChange({
                            id: props.id,
                            value: v.value,
                            type: 'button',
                            addValue: value
                        });
                    }}
                >
                    <Button {...btnProps}>{v.label}</Button>
                </Cascader>
            )
        }

        return (
            <Button
                {...btnProps}
                onClick={(e) => {
                    props.onChange({
                        id: props.id,
                        value: v.value,
                        type: 'button'
                    });
                }}
            >
                {v.label}
            </Button>
        )
    });

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
            extra={props.extra}
        >
            <Row type="flex" gutter={props.childGutter}>
                <Col {...props.childSpan.left}>
                    {props.getFieldDecorator(props.id, {
                        rules: props.rules,
                        initialValue: props.value,
                    })(ChildEle)}
                </Col>
                <Col {...props.childSpan.right}>
                    {btnEle}
                </Col>
            </Row>
        </FormItem>
    );
}

BaseInputButton.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseInputButton;

