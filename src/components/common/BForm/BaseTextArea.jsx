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
        rows,
        rules,
        style,
        value,
    } = props;

    const commonProps = {
        disabled,
    }

    const defaultProps = {
        ...commonProps,
        placeholder,
        onChange: (e) => {
            onChange({ id, value: e.target.value });
        },
        style,
        rows,
    };

    const childSpanLeft = lodash.get(childSpan, 'left', {});
    const childSpanRight = lodash.get(childSpan, 'right', {});
    const inputEle = <TextArea {...defaultProps} />;
    let ChildEle = null
    switch (addType) {
        case 'button':
            const btnEle = options.map((v, i) => {
                const style = { marginBottom: 8 };
                if (i < options.length - 1) {
                    style.marginRight = 8;
                }

                return (
                    <Button
                        {...commonProps}
                        key={i}
                        type={v.type}
                        style={style}
                        onClick={(e) => {
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

BaseTextArea.propTypes = {
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
    rows: propTypes.number,
    rules: propTypes.array,
    style: propTypes.object,
};

export default BaseTextArea;
