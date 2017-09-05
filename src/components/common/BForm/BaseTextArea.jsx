/**
 * 多行文本输入框
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const BaseTextArea = (props) => {

    const commonProps = {
        disabled: props.disabled,
    }

    const defaultProps = {
        ...commonProps,
        placeholder: props.placeholder,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value,
            })
        },
        style: props.style,
        rows: props.rows,
    };

    const gutter = props.childGutter;
    const childSpanLeft = lodash.get(props, 'childSpan.left', {});
    const childSpanRight = lodash.get(props, 'childSpan.right', {});
    const inputEle = <TextArea {...defaultProps} />;
    let ChildEle = null
    switch (props.addType) {
        case 'button':
            const btnEle = props.option.map((v, i) => {
                const style = { marginBottom: 8 };
                if (i < props.option.length - 1) {
                    style.marginRight = 8;
                }

                return (
                    <Button
                        {...commonProps}
                        key={i}
                        type={v.type}
                        style={style}
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

BaseTextArea.propTypes = {
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
    rows: propTypes.number,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseTextArea;

