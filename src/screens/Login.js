import React, {Component} from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import FormItem from "antd/es/form/FormItem";
import {connect} from 'react-redux';
import {auth} from '../actions/login';



class Login extends React.Component {
    login = (v) => {
        const {history} = this.props;
        this.props.onAuth();
        history.replace('/');
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
               this.login(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                    <FormItem>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login)

const mapStateToProps = state => {
    return {
        store: state
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        onAuth: () => dispatch(auth())
       // onAuth: () => {}
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
