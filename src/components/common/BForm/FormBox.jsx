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
import BaseInputButton from './BaseInputButton.jsx';
import BaseInputRadio from './BaseInputRadio.jsx';
import BaseNumber from './BaseNumber.jsx';
import BaseRadio from './BaseRadio.jsx';
import BaseRadioButton from './BaseRadioButton.jsx';
import BaseSearch from './BaseSearch.jsx';
import BaseSelect from './BaseSelect.jsx';
import BaseSelectInput from './BaseSelectInput.jsx';
import BaseText from './BaseText.jsx';
import BaseTextArea from './BaseTextArea.jsx';
import BaseTextAreaButton from './BaseTextAreaButton.jsx';

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
        min                         : 0,
        mode                        : '',
        notFoundContent             : '没有数据',
        option                      : [],
        rows                        : 4,
        rules                       : {},
        space                       : 10,
        showTime                    : true,
    }

    getNewClassName = () => {
        const { layout, className } = this.props;

        const newClass = classnames({
            'label-vertical': layout === 'vertical',
            [className]: !!className,
        });

        return newClass;
    }

    getNewValue = () => {
        const { type, value, option, render, isDate, format, join } = this.props;
        let newValues = value;
        switch (type) {
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
            case 'radio-button':
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
                newValues = value ? moment(value) : undefined;
                break;
            case 'date-range':
                if (lodash.isArray(value)) {
                    newValues = [moment(value[0]), moment(value[1])];
                } else if (typeof value === 'string') {
                    newValues = [moment(value)];
                } else {
                    newValues = [];
                    // console.log('Type is date-range, The value should is array or string!');
                }
                break;
            case 'input-radio':
                let InputRadioInputValue = '';
                let InputRadioRadioValue = '';
                if (!!value) {
                    if (lodash.isArray(value)) {
                        InputRadioInputValue = value[0];
                        InputRadioRadioValue = value[1];
                    } else {
                        InputRadioInputValue = value;
                    }
                }
                newValues = { inputValue: InputRadioInputValue, radioValue: InputRadioRadioValue };
                break;
            case 'search':
                if (typeof value === 'string') {
                    newValues = { province: '', city: '', district: '', road: value };
                }
                break;
            case 'enum-input':
                let SelectInputInputValue = '';
                let SelectInputSelectValue = '';
                if (!!value) {
                    if (lodash.isArray(value)) {
                        SelectInputInputValue = value[0];
                        SelectInputSelectValue = value[1];
                    } else {
                        SelectInputInputValue = value;
                    }
                }
                newValues = { inputValue: SelectInputInputValue, selectValue: SelectInputSelectValue };
                break;
            case 'text':
                if (render) {
                    // 配置render函数
                    newValues = render(value);
                } else if (isDate) {
                    // 日期
                    newValues = moment(value).format(format);
                }  else if (lodash.isArray(value)) {
                    // 数组
                    newValues = value.join(join);
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
            case 'date-range':
                const DateRangeStr = placeholder || label || id;
                newPlaceholder = [`开始${DateRangeStr}`, `结束${DateRangeStr}`];
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
        const { area, option, type } = this.props;
        const newOption = option || [];
        if (area && type === 'cascader') {
            const T = {
                quanguo: CHINESE_CITYS,
                shanghai: CHINESE_SHANGHAI,
                beijing: CHINESE_BEIJING,
            };
            return T[area] || newOption;
        }
        return newOption;
    }

    getNewStyle = () => {
        const { type, toUpper } = this.props;
        const newStyle = {};
        if (toUpper) {
            Object.assign(newStyle, { textTransform: 'uppercase' });
        }
        switch (type) {
            case 'cascader':
            case 'date':
            case 'date-range':
            case 'number':
            case 'enum':
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

        const commonProps = {
            allowClear                  : this.props.allowClear,
            childSpan                   : newChildSpan,
            childGutter                 : this.props.childGutter,
            className                   : newClassName,
            disabled                    : this.props.disabled,
            defaultActiveFirstOption    : this.props.defaultActiveFirstOption,
            dropdownMatchSelectWidth    : this.props.dropdownMatchSelectWidth,
            extra                       : this.props.extra,
            getFieldDecorator           : this.props.getFieldDecorator,
            format                      : this.props.format,
            filterOption                : this.props.filterOption,
            id                          : this.props.id,
            join                        : this.props.join,
            label                       : this.props.label,
            layout                      : newLayout,
            max                         : this.props.max,
            min                         : this.props.min,
            mode                        : this.props.mode,
            option                      : newOption,
            onChange                    : this.props.onChange,
            placeholder                 : newPlaceholder,
            rows                        : this.props.rows,
            rules                       : newRules,
            showTime                    : this.props.showTime,
            showSearch                  : this.props.showSearch,
            selectWidth                  : this.props.selectWidth,
            step                        : this.props.step,
            style                       : newStyle,
            value                       : newValue,
        };

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
                    onChange: this.props.onChange,
                    option: newOption,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
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
                    onChange: this.props.onChange,
                    option: newOption,
                    rules: newRules,
                    style: newStyle,
                }
                ChildEle = <BaseCheckbox {...checkboxProps} />;
                break;
            case 'date':
                const dateProps = {
                    className: newClassName,
                    dateType: this.props.dateType,
                    disabled: this.props.disabled,
                    format: this.props.format,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.props.onChange,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                    showTime: this.props.showTime,
                }
                ChildEle = <BaseDatePicker {...dateProps} />;
                break;
            case 'input':
                const inputProps = {
                    className: newClassName,
                    disabled: this.props.disabled,
                    extra: this.props.extra,
                    getFieldDecorator: this.props.getFieldDecorator,
                    id: this.props.id,
                    inputType: this.props.inputType,
                    label: this.props.label,
                    layout: newLayout,
                    onChange: this.props.onChange,
                    placeholder: newPlaceholder,
                    rules: newRules,
                    style: newStyle,
                }
                ChildEle = <BaseInput {...inputProps} />;
                break;
            case 'input-button':
                ChildEle = <BaseInputButton {...commonProps} />;
                break;
            case 'input-radio':
                ChildEle = <BaseInputRadio {...commonProps} />;
                break;
            case 'number':
                ChildEle = <BaseNumber {...commonProps} />;
                break;
            case 'radio':
                ChildEle = <BaseRadio {...commonProps} />;
                break;
            case 'radio-button':
                ChildEle = <BaseRadioButton {...commonProps} />;
                break;
            case 'search':
                ChildEle = <BaseSearch {...commonProps} />;
                break;
            case 'enum':
                ChildEle = <BaseSelect {...commonProps} />;
                break;
            case 'enum-input':
                ChildEle = <BaseSelectInput {...commonProps} />;
                break;
            case 'text':
                ChildEle = <BaseText {...commonProps} />;
                break;
            case 'textarea':
                ChildEle = <BaseTextArea {...commonProps} />;
                break;
            case 'textarea-button':
                ChildEle = <BaseTextAreaButton {...commonProps} />;
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
