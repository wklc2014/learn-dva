/**
 * 单行输入文本框 + 单选按钮
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Input, Radio, Row, Col } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const BaseInputRadio = (props) => {

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

    const radioEle = (
        <RadioGroup
            disabled={props.disabled}
            value={props.value.radioValue}
            onChange={e => {
                props.onChange({
                    id: props.id,
                    value: e.target.value,
                    type: 'radio'
                });
            }}
        >
            {props.option.map((v, i) => <Radio key={i} value={v.value}>{v.label}</Radio>)}
        </RadioGroup>
    );

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
                        initialValue: props.value.inputValue,
                    })(ChildEle)}
                </Col>
                <Col {...props.childSpan.right}>
                    {radioEle}
                </Col>
            </Row>
        </FormItem>
    );
}

BaseInputRadio.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseInputRadio;
