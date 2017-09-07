/**
 * 复选框
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';
import lodash from 'lodash';
import { Form, Checkbox } from 'antd';
import Simditor from "simditor";
import $ from 'jquery';
require("simditor/styles/simditor.css");

const FormItem = Form.Item ;
const CheckboxGroup = Checkbox.Group;

const refID = 'textarea_uid';

class BaseEditor extends Component {

    componentDidMount() {
         this.initEditor();
    }

    initEditor = () => {
        let config = {
            placeholder: this.props.placeholder,
            defaultImage: 'images/image.png',
            params: {},
            tabIndent: true,
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'link',
                'hr',
                'image',
                'indent',
                'outdent',
                'alignment',
            ],


            toolbarFloat: true,
            toolbarFloatOffset: 0,
            toolbarHidden: false,
            pasteImage: false,
            cleanPaste: false,
            textarea: $(this.refs[this.props.id])
        };

        this.editor = new Simditor(config);// 初始化编辑器
        this.editor.setValue(this.props.value);

        //监听改变
        this.editor.on("valuechanged", (e, src) => {
            this.props.onChange(this.getValue());
        });

        //更改图片上传类型
        $(".simditor input[type='file']").attr('accept', 'image/jpg,image/jpeg,image/png,image/bmp');
    };

    getValue = () => {
        // return this.editor.getValue().trim();
        let selectName = `#${this.props.id} .simditor`;
        let html = $(selectName).find(".simditor-body").html();
        console.log(html);
        return html;
    };

    render() {
        const {
            className,
            label,
            layout,
            style,
            value,

            disabled,
            id,
            onChange,
            options,
            rules,
        } = this.props;

        const { getFieldDecorator } = this.props.form;

        const defaultProps = {
            disabled,
            onChange: (value) => {
                onChange({ id, value });
            },
            options,
            style,
        };

        const ChildEle = (
            <textarea
                id={`editor_${id}`}
                ref={id}
                placeholder="请输入内容"
            />
        )

        return (
            <FormItem
                {...layout}
                label={label}
                className={className}
            >
                {getFieldDecorator(id, {
                    rules,
                })(ChildEle)}
            </FormItem>
        );
    }
}

BaseEditor.propTypes = {
    className: propTypes.string,
    label: propTypes.string,
    layout: propTypes.object,
    style: propTypes.object,

    disabled: propTypes.bool,
    id: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    options: propTypes.array.isRequired,
    rules: propTypes.array,
};

export default Form.create()(BaseEditor);
