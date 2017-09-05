/**
 * 单行文本框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Input, Row, Col, Radio, Button } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const BaseInput = (props) => {
    const { disabled, placeholder } = props;

    const defaultProps = {
        disabled,
        placeholder,
        size: 'large',
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value,
            });
        },
        style: props.style,
    };

    let ChildEle = null;

    const gutter = props.childGutter;
    const childSpanLeft = lodash.get(props, 'childSpan.left', {});
    const childSpanRight = lodash.get(props, 'childSpan.right', {});
    const inputEle = <Input {...defaultProps} />;

    switch (props.addType) {
        case 'button':
            const btnEle = props.option.map((v, i) => {
                const style = { marginBottom: 8 };
                if (i < props.option.length - 1) {
                    style.marginRight = '8px';
                }

                const btnProps = {
                    key: i,
                    type: v.type,
                    size: 'large',
                    style,
                    disabled,
                };

                if (v.value === 'city') {
                    return (
                        <Cascader
                            key={i}
                            options={v.citys}
                            onChange={(value) => {
                                props.onChange({
                                    id: props.id,
                                    value: v.value,
                                    type: 'button',
                                    addValue: value,
                                });
                            }}
                        >
                            <Button {...btnProps}>{v.label}</Button>
                        </Cascader>
                    );
                }

                return (
                    <Button
                        {...btnProps}
                        onClick={(e) => {
                            props.onChange({
                                id: props.id,
                                value: v.value,
                                type: 'button',
                            });
                        }}
                    >
                        {v.label}
                    </Button>
                )
            });
            ChildEle = (
                <Row type="flex" gutter={gutter}>
                    <Col {...childSpanLeft}>
                        {props.getFieldDecorator(props.id, {
                            rules: props.rules,
                            initialValue: props.value,
                        })(inputEle)}
                    </Col>
                    <Col {...childSpanRight}>
                        {btnEle}
                    </Col>
                </Row>
            );
            break;
        case 'radio':
            const radioValue = lodash.get(props, 'value.radioValue', undefined);
            const inputValue = lodash.get(props, 'value.inputValue', undefined);
            const radioEle = (
                <RadioGroup
                    disabled={disabled}
                    value={radioValue}
                    onChange={(e) => {
                        props.onChange({
                            id: props.id,
                            value: e.target.value,
                            type: 'radio',
                        });
                    }}
                >
                    {props.option.map((v, i) => <Radio key={i} value={v.value}>{v.label}</Radio>)}
                </RadioGroup>
            );
            ChildEle = (
                <Row type="flex" gutter={gutter}>
                    <Col {...childSpanLeft}>
                        {props.getFieldDecorator(props.id, {
                            rules: props.rules,
                            initialValue: inputValue,
                        })(inputEle)}
                    </Col>
                    <Col {...childSpanRight}>
                        {radioEle}
                    </Col>
                </Row>
            );
            break;
        default:
            ChildEle = props.getFieldDecorator(props.id, {
                rules: props.rules,
                initialValue: props.value,
            })(inputEle);
    }

    return (
        <FormItem
            {...props.layout}
            label={props.label}
            className={props.className}
            extra={props.extra}
        >
            {ChildEle}
        </FormItem>
    );
}

BaseInput.propTypes = {
    addType: propTypes.string,
    className: propTypes.string,
    disabled: propTypes.bool,
    extra: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    option: propTypes.array,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseInput;

