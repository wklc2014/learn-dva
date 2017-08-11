/**
 * 用户调查
 */

import React, { Component } from 'react';
import { Button } from 'antd';

import { CONFIG_USER_SURVERY } from './common/';
import FormGroup from '../common/BForm/FormGroup.jsx';

class UserSurvery extends Component {

    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {
            // e: '2017-05-12 12:20:30'
        };
    }

    onChange = ({ id, value, type, addValue }) => {
        console.log(id, value, type, addValue);
        this.setState({
            [id]: value,
        })
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
                        values={this.state}
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

export default UserSurvery;
