/**
 * 生成单个 <FormItem /> 组件
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';

const FormBox = Base => class extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        const next = JSON.stringify(nextProps);
        const prev = JSON.stringify(this.props);
        // console.log(this.props)
        return true;
        return next !== prev;
    }

    render() {
        const props = {
            ...this.props,
        }

        return <Base {...props} />;
    }
}

export default FormBox;
