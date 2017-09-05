/**
 * 生成单个 <FormItem /> 组件
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import lodash from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import formLayout from './formLayout/';

import BaseCascader from './BaseCascader.jsx';
import BaseCheckbox from './BaseCheckbox.jsx';
import BaseDatePicker from './BaseDatePicker.jsx';
import BaseInput from './BaseInput.jsx';
import BaseInputAdd from './BaseInputAdd.jsx';
import BaseNumber from './BaseNumber.jsx';
import BaseRadio from './BaseRadio.jsx';
import BaseSelect from './BaseSelect.jsx';
import BaseText from './BaseText.jsx';
import BaseTextArea from './BaseTextArea.jsx';

import * as CONSTANTS from '../constants/';
import { CHINESE_CITYS, CHINESE_SHANGHAI, CHINESE_BEIJING } from './utils/ChineseCities.js';
import { getChildGridLayout } from './utils/';

class FormBox extends Component {

    static defaultProps = {
        allowClear                  : false,
        childSpan                   : 9,
        childGutter                 : 16,
        disabled                    : false,
        dropdownMatchSelectWidth    : false,
        format                      : CONSTANTS.FORMAT_DATE_STRING,
        join                        : '-',
        layout                      : 'A',
        mode                        : '',
        notFoundContent             : '没有数据',
        option                      : [],
        rows                        : 4,
        rules                       : {},
        space                       : 20,
        showTime                    : true,
    }

    shouldComponentUpdate(nextProps, nextState) {
        const next = JSON.stringify(nextProps);
        const prev = JSON.stringify(this.props);
        return next !== prev;
    }

    onChange = ({ id, value, type, addValue }) => {
        let newValue = value;
        if (this.props.toUpper && typeof value === 'string') {
            newValue = value.toUpperCase();
        }
        this.props.onChange({ id, value: newValue, type, addValue });
    }

    getNewClassName = () => {
        const { layout, className } = this.props;

        const newClassName = classnames({
            'label-vertical': layout === 'vertical',
            [className]: !!className,
        });

        return newClassName;
    }

    getNewValue = () => {
        const { value, option } = this.props;
        let newValues = value;
        switch (this.props.type) {
            case 'checkbox':
                if (!value && option) {
                    const o = [];
                    option.forEach((v) => {
                        if (v.selected) {
                            o.push(v.value);
                        }
                    })
                    newValues = o;
                }
                break;
            case 'radio':
            case 'enum':
                if (!value && option) {
                    option.some((v) => {
                        if (v.selected) {
                            newValues = v.value;
                        }
                        return v.selected;
                    })
                }
                break;
            case 'date':
                if (this.props.addType === 'range') {
                    let r = [];
                    if (typeof value === 'string') {
                        r = value.split(',');
                    } else if (lodash.isArray(value)) {
                        r = [...value];
                    }
                    const a = r[0] ? moment(r[0]) : undefined;
                    const b = r[1] ? moment(r[1]) : undefined;
                    newValues = [a, b];
                } else {
                    newValues = value ? moment(value) : undefined;
                }
                break;
            case 'input':
                if (this.props.addType === 'radio') {
                    let inputValue = '';
                    let radioValue = '';
                    if (!value || (value && typeof value === 'string')) {
                        inputValue = value;
                    } else {
                        inputValue = value.inputValue;
                        radioValue = value.radioValue;
                    }
                    newValues = { inputValue, radioValue };
                }
                break;
            case 'inputAdd':
                if (this.props.addType === 'before-select') {
                    let inputValue = '';
                    let addValue = '';
                    if (!value || (value && typeof value === 'string')) {
                        inputValue = value;
                    } else {
                        inputValue = value.inputValue;
                        addValue = value.addValue;
                    }
                    newValues = { inputValue, addValue };
                }
                break;
            case 'text':
                if (this.props.render) {
                    // 配置render函数
                    newValues = this.props.render(value);
                } else if (this.props.isDate) {
                    // 日期
                    newValues = moment(value).format(this.props.format);
                }  else if (lodash.isArray(value)) {
                    // 数组
                    newValues = value.join(this.props.join);
                } else if (option){
                    // 枚举值映射
                    option.some((v) => {
                        if (v.value === value) {
                            newValues = v.label;
                        }
                        return v.value === props.value;
                    })
                }
                break;
        }
        return newValues;
    }

    getNewPlaceholder = () => {
        const { placeholder, label, id, type } = this.props;
        const str = placeholder || `请输入${label || id}`;
        let newPlaceholder;
        switch (type) {
            case 'date':
                if (this.props.addType === 'range') {
                    const DateRangeStr = placeholder || label || id;
                    newPlaceholder = [`开始${DateRangeStr}`, `结束${DateRangeStr}`];
                } else {
                    newPlaceholder = str;
                }
                break;
            default:
                newPlaceholder = str;
        }
        return newPlaceholder;
    }

    getNewRules = () => {
        const { rules, label, id, value } = this.props;
        const newRules = [];

        if (rules.required) {
            newRules.push({
                required: true,
                message: `${label || id}必填`,
            });
        }

        return newRules;
    }

    getNewLayout = () => {
        const { layout, colSpan } = this.props;
        const L = formLayout[layout] || {};
        const newLayout = L[`colSpan_${colSpan}`] || L.normal;
        return newLayout;
    }

    getNewOption = () => {
        const { option, type } = this.props;
        let newOption = option || [];
        switch (this.props.type) {
            case 'cascader':
                const T = {
                    quanguo: CHINESE_CITYS,
                    shanghai: CHINESE_SHANGHAI,
                    beijing: CHINESE_BEIJING,
                };
                if (this.props.area && T[this.props.area]) {
                    newOption = [...T[this.props.area]];
                }
        }
        return newOption;
    }

    getNewStyle = () => {
        const newStyle = {};
        if (this.props.toUpper) {
            Object.assign(newStyle, { textTransform: 'uppercase' });
        }
        switch (this.props.type) {
            case 'cascader':
            case 'date':
            case 'number':
            case 'enum':
            case 'inputAdd':
                Object.assign(newStyle, { width: '100%' });
                break;
        }
        return newStyle;
    }

    render() {
        const newPlaceholder = this.getNewPlaceholder();
        const newRules = this.getNewRules();
        const newLayout = this.getNewLayout();
        const newValue = this.getNewValue();
        const newClassName = this.getNewClassName();
        const newOption = this.getNewOption();
        const newStyle = this.getNewStyle();
        const newChildSpan = getChildGridLayout(this.props.childSpan);

        let ChildEle = null;
        switch (this.props.type) {
            case 'cascader':
                const cascaderProps = {
                    allowClear: this.props.allowClear,
                    className: newClassName,
                    disabled: this.props.disabled,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseCascader {...cascaderProps} />;
                break;
            case 'checkbox':
                const checkboxProps = {
                    className: newClassName,
                    disabled: this.props.disabled,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    option: newOption,
                    rules: newRules,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseCheckbox {...checkboxProps} />;
                break;
            case 'date':
                const dateProps = {
                    addType: this.props.addType,
                    className: newClassName,
                    disabled: this.props.disabled,
                    format: this.props.format,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    showTime: this.props.showTime,
                    value: newValue,
                }
                ChildEle = <BaseDatePicker {...dateProps} />;
                break;
            case 'input':
                const inputProps = {
                    addType: this.props.addType,
                    className: newClassName,
                    childGutter: this.props.childGutter,
                    childSpan: newChildSpan,
                    disabled: this.props.disabled,
                    extra: this.props.extra,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    toUpper: this.props.toUpper,
                    value: newValue,
                }
                ChildEle = <BaseInput {...inputProps} />;
                break;
            case 'number':
                const numberProps = {
                    className: newClassName,
                    disabled: this.props.disabled,
                    extra: this.props.extra,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    min: this.props.min,
                    max: this.props.max,
                    step: this.props.step,
                    onChange: this.onChange,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseNumber {...numberProps} />;
                break;
            case 'radio':
                const radioProps = {
                    addType: this.props.addType,
                    className: newClassName,
                    childGutter: this.props.childGutter,
                    childSpan: newChildSpan,
                    disabled: this.props.disabled,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseRadio {...radioProps} />;
                break;
            case 'enum':
                const enumProps = {
                    allowClear: this.props.allowClear,
                    className: newClassName,
                    disabled: this.props.disabled,
                    dropdownMatchSelectWidth: this.props.dropdownMatchSelectWidth,
                    extra: this.props.extra,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    mode: this.props.mode,
                    onChange: this.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseSelect {...enumProps} />;
                break;
            case 'inputAdd':
                const inputAddProps = {
                    addType: this.props.addType,
                    className: newClassName,
                    childGutter: this.props.childGutter,
                    childSpan: newChildSpan,
                    disabled: this.props.disabled,
                    dropdownMatchSelectWidth: this.props.dropdownMatchSelectWidth,
                    extra: this.props.extra,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    selectWidth: this.props.selectWidth,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseInputAdd {...inputAddProps} />;
                break;
            case 'text':
                const textProps = {
                    className: newClassName,
                    label: this.props.label,
                    layout: newLayout,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseText {...textProps} />;
                break;
            case 'textarea':
                const textareaProps = {
                    addType: this.props.addType,
                    className: newClassName,
                    childGutter: this.props.childGutter,
                    childSpan: newChildSpan,
                    disabled: this.props.disabled,
                    extra: this.props.extra,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rows: this.props.rows,
                    rules: newRules,
                    style: newStyle,
                    value: newValue,
                }
                ChildEle = <BaseTextArea {...textareaProps} />;
                break;
        }

        return <div style={{ paddingRight: this.props.space }}>{ChildEle}</div>;
    }
}

FormBox.propTypes = {
    type: propTypes.string.isRequired,

    disabled: propTypes.bool,
    getFieldDecorator: propTypes.func,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    onChange: propTypes.func,
    option: propTypes.array,
    placeholder: propTypes.string,
    rows: propTypes.number,
    rules: propTypes.object,
    space: propTypes.number,
};

export default FormBox;
