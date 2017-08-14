/**
 * 用户调查
 */
import { connect } from 'dva';
import React, { Component } from 'react';
import { Button } from 'antd';

import { CONFIG_USER_SURVERY } from './common/';
import FormGroup from '../common/BForm/FormGroup.jsx';

class UserSurvery extends Component {

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = ({ id, value, type, addValue }) => {
        // console.log(id, value, type, addValue);
        const newValue = { [id]: value };
        this.props.dispatch({
            type: 'UserSurvery/update',
            payload: { modelKey: 'Basic', modelValue: newValue },
        })
        // switch (id) {
        //     case 'ab':
        //         if (type === 'radio') {
        //             newValue[id] = [this.state[id], value];
        //         }
        //         break;
        // }
        // this.setState(newValue);
    }

    onSubmit = () => {
        this.refs.formGroup_1.validateFields((errors, values) => {
            console.log(errors, values)
        })
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
                        configs={CONFIG_USER_SURVERY}
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

export default connect(mapStateToProps)(UserSurvery);
