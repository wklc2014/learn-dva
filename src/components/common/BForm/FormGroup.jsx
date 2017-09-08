/**
 * 生成一组 <FormItem /> 组件
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import FormBox from './FormBox.jsx';
import { getGridLayout } from './utils/';

class FormGroup extends Component {

    static defaultProps = {
        values: {},
    }

    getInstance = (id) => {
        const inst = this.refs[`FormBox_${id}`].formRef;
        return inst;
    }

    getConfigsIDs = () => {
        const { configs } = this.props;
        return Object.keys(configs).map((v) => v);
    }

    validateFields = () => {
        const ids = this.getConfigsIDs();
        let canSubmit = true;
        ids.forEach((id) => {
            const instance = this.getInstance(id);
            instance.props.form.validateFields((errors, values) => {
                if (errors && canSubmit) {
                    canSubmit = false;
                }
            })
        });
        return canSubmit;
    }

    setFieldsValue = (fields = {}) => {
        const ids = this.getConfigsIDs();
        Object.keys(fields).forEach((id) => {
            if (ids.indexOf(id) !== -1) {
                const instance = this.getInstance(id);
                instance.props.form.setFieldsValue({ [id]: fields[id] });
            }
        });
    }

    getFieldValue = (id = '') => {
        const ids = this.getConfigsIDs();
        const fieldValue = {};
        if (ids.indexOf(id) !== -1) {
            const instance = this.getInstance(id);
            fieldValue[id] = instance.props.form.getFieldValue(id);
        }
        return fieldValue;
    }

    getFieldsValue = (fields = []) => {
        const ids = this.getConfigsIDs();
        const fieldsValue = {};
        if (!fields || !fields.length) {
            fields = [...ids];
        }
        fields.forEach((id) => Object.assign(fieldsValue, this.getFieldValue(id)));
        return fieldsValue;
    }

    resetFields = (fields = []) => {
        const ids = this.getConfigsIDs();
        let resetStatus = true;
        Object.keys(fields).forEach((id) => {
            if (ids.indexOf(id) !== -1) {
                const instance = this.getInstance(id);
                resetStatus = instance.props.form.resetFields();
            }
        });
        return resetStatus;
    }

    render() {
        const { configs, onChange, values, formProps, col, className } = this.props;

        const formEle = Object.keys(configs)
            .sort((m, n) => {
                if (configs[m].order > configs[n].order) {
                    return 1;
                } else if (configs[m].order < configs[n].order) {
                    return -1;
                } else {
                    return 0;
                }
            })
            .map((v, i) => {
                const val = configs[v];
                const groupProps = {
                    ...val,
                    ...formProps,
                    onChange,
                    key: i,
                    id: v,
                    value: values[v],
                    ref: `FormBox_${v}`,
                };
                const newColProps = getGridLayout(col, val.colSpan);
                return (
                    <Col
                        key={`FormBox_${i}`}
                        {...newColProps}
                    >
                        <FormBox {...groupProps} />
                    </Col>
                );
            });

        return <Form className={className}><Row type="flex">{formEle}</Row></Form>;
    }
}

FormGroup.propTypes = {
    configs: propTypes.object.isRequired,
    col: propTypes.number,
    formProps: propTypes.object,
    onChange: propTypes.func,
    values: propTypes.object,
    className: propTypes.string,
};

export default FormGroup;
