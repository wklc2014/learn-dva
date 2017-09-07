/**
 * 用户调查
 */
import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';

import * as CONFIGS from './common/';
import FormGroup from '../common/BForm/FormGroup.jsx';

class SurveryContent extends Component {

    static defaultProps = {
    }

    onChange = ({ id, value, type, addValue }) => {
        // console.log(id, value, type, addValue);
        const newValue = { [id]: value };
        switch (id) {
            case 'contactPhone':
                if (type === 'radio') {
                    const t = { '01': '标的:13591993996', '02': '三者:18111224835' };
                    newValue[id] = { inputValue: t[value], addValue: value };
                }
                break;
            case 'address':
                if (type === 'button') {
                    const t = { '01': '标的:13591993996', '02': '三者:18111224835' };
                    newValue[id] = t[value];
                }
            case 'accidentCreate':
                if (type === 'button' && value === '01') {
                    newValue[id] = '自动生成描述巴拉巴拉小魔仙';
                }
                break;
        }
        this.props.dispatch({
            type: 'UserSurvery/update',
            payload: { modelKey: 'Basic', modelValue: newValue },
        })
    }

    onSubmit = () => {
        const canSubmit = this.refs.formGroup_1.validateFields();
        console.log('canSubmit>>>', canSubmit);
    }

    render() {
        const commonStyle = {
            border: '1px solid #eee',
            marginBottom: 20,
            padding: '10px 20px'
        }

        return (
            <section>
                <div style={commonStyle}>
                    <FormGroup
                        ref="formGroup_1"
                        configs={CONFIGS.EDITOR}
                        col={3}
                        onChange={this.onChange}
                        formProps={{
                            layout: 'layout_2',
                        }}
                        values={this.props.values}
                    />
                </div>
                <p>
                    <Button onClick={this.onSubmit}>
                        提交
                    </Button>
                </p>
            </section>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        values: state.UserSurvery.Basic,
    }
}

export default connect(mapStateToProps)(SurveryContent);
// export default SurveryContent;
