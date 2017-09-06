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
        className,
        label,
        layout,
        style,
        value,

        addType,
        childGutter,
        childSpan,
        disabled,
        extra,
        id,
        onChange,
        options,
        placeholder,
        rules,
        toUpperCase,
        toLowerCase,
    } = props;

    const { getFieldDecorator } = props.form;

    const defaultProps = {
        disabled,
        placeholder,
        size: 'large',
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
                        })(inputEle)}
                    </Col>
                    <Col {...childSpanRight}>
                        {btnEle}
                    </Col>
                </Row>
            );
            break;
        case 'radio':
            const addValue = lodash.get(value, 'addValue', undefined);
            const inputValue = lodash.get(value, 'inputValue', undefined);
            const radioEle = (
                <RadioGroup
                    disabled={disabled}
                    value={addValue}
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
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,

    addType: propTypes.string,
    childGutter: propTypes.number,
    childSpan: propTypes.object,
    disabled: propTypes.bool,
    extra: propTypes.string,
    id: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    options: propTypes.array,
    placeholder: propTypes.string,
    rules: propTypes.array,
    toUpperCase: propTypes.bool,
    toLowerCase: propTypes.bool,
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
        const { id, value, addType } = props;
        let inputValue = value;
        if (addType === 'radio') {
            inputValue = value.inputValue;
        }
        return { [id]: { value: inputValue } }
    }
})(BaseInput);
