/**
 * 多行文本输入框 + 按钮组
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import classnames from 'classnames';
import { Form, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const BaseTextAreaButton = (props) => {
    const defaultProps = {
        disabled: props.disabled,
        placeholder: props.placeholder,
        onChange: (e) => {
            props.onChange({
                id: props.id,
                value: e.target.value
            })
        },
        rows: props.rows,
    };

    const ChildEle = <TextArea {...defaultProps} />;

    const btnEle = props.option.map((v, i) => {
        const style = {};
        if (i < props.option.length - 1) {
            style.marginRight = '8px';
        }

        return (
            <Button
                key={i}
                type={v.type}
                style={style}
                disabled={props.disabled}
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

BaseTextAreaButton.propTypes = {
    option: propTypes.array.isRequired,
};

export default BaseTextAreaButton;

