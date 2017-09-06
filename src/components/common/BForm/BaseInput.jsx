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
    const {
        addType,
        className,
        childGutter,
        childSpan,
        disabled,
        extra,
        getFieldDecorator,
        id,
        label,
        layout,
        onChange,
        options,
        placeholder,
        rules,
        style,
        toUpperCase,
        toLowerCase,
        value,
    } = props;

    const defaultProps = {
        disabled,
        placeholder,
        size: 'large',
        onChange: (e) => {
            onChange({ id, value: e.target.value });
        },
        style,
    };

    let ChildEle = null;

    const childSpanLeft = lodash.get(childSpan, 'left', {});
    const childSpanRight = lodash.get(childSpan, 'right', {});
    const inputEle = <Input {...defaultProps} />;

    switch (addType) {
        case 'button':
            const btnEle = options.map((v, i) => {
                const style = { marginBottom: 8 };
                if (i < options.length - 1) {
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
                                onChange({
                                    id,
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
                        onClick={() => {
                            onChange({
                                id,
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
                <Row type="flex" gutter={childGutter}>
                    <Col {...childSpanLeft}>
                        {getFieldDecorator(id, {
                            rules,
                            initialValue: value,
                        })(inputEle)}
                    </Col>
                    <Col {...childSpanRight}>
                        {btnEle}
                    </Col>
                </Row>
            );
            break;
        case 'radio':
            const radioValue = lodash.get(value, 'radioValue', undefined);
            const inputValue = lodash.get(value, 'inputValue', undefined);
            const radioEle = (
                <RadioGroup
                    disabled={disabled}
                    value={radioValue}
                    onChange={(e) => {
                        onChange({
                            id,
                            value: e.target.value,
                            type: 'radio',
                        });
                    }}
                >
                    {options.map((v, i) => <Radio key={i} value={v.value}>{v.label}</Radio>)}
                </RadioGroup>
            );
            ChildEle = (
                <Row type="flex" gutter={childGutter}>
                    <Col {...childSpanLeft}>
                        {getFieldDecorator(id, {
                            rules,
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
            ChildEle = getFieldDecorator(id, {
                rules,
                initialValue: value,
            })(inputEle);
    }

    return (
        <FormItem
            {...layout}
            label={label}
            className={className}
            extra={extra}
        >
            {ChildEle}
        </FormItem>
    );
}

BaseInput.propTypes = {
    addType: propTypes.string,
    className: propTypes.string,
    childGutter: propTypes.number,
    childSpan: propTypes.object,
    disabled: propTypes.bool,
    extra: propTypes.string,
    getFieldDecorator: propTypes.func.isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    layout: propTypes.object,
    onChange: propTypes.func.isRequired,
    options: propTypes.array,
    placeholder: propTypes.string,
    rules: propTypes.array,
    style: propTypes.object,
    toUpperCase: propTypes.bool,
    toLowerCase: propTypes.bool,
};

export default BaseInput;
