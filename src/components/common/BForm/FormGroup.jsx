/**
 * 生成一组 <FormItem /> 组件
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import FormWraper from './FormWraper.jsx';
import { getGridLayout } from './utils/';

class FormGroup extends Component {

    static defaultProps = {
        values: {},
    }

    render() {
        const { configs, onChange, values, formProps, col, className } = this.props;

        const formEle = Object.keys(configs).sort((m, n) => {
            if (configs[m].order > configs[n].order) {
                return 1;
            } else if (configs[m].order < configs[n].order) {
                return -1;
            } else {
                return 0;
            }
        }).map((v, i) => {
            const val = configs[v];
            const groupProps = {
                ...val,
                ...formProps,
                form: this.props.form,
                onChange,
                key: i,
                id: v,
                value: values[v],
            };
            const newColProps = getGridLayout(col, val.colSpan);
            return <Col key={i} {...newColProps}><FormWraper {...groupProps} /></Col>;
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

export default Form.create()(FormGroup);
