import React, {Component} from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import FormItem from "antd/es/form/FormItem";
import {connect} from 'react-redux';
import {auth, loginCheck} from '../actions/login';
import LanguagesMenu from  '../components/languagesMenu';
import {connectLanguages} from '../connectLanguages';



class Login extends React.Component {
    state = {
        isLoading: false,
        error: null
    }

    login = (v) => {
        this.props.onAuth(v);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false
        });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.login(values);
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isAuthenticated, isFail} = nextProps.login;
        if (isAuthenticated) {
            const {history} = this.props;
            history.replace('/');
        } else if (isFail) {
            this.setState({
                error: 'error'
            })
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {t, login} = this.props;
        return (
            <div className='login'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <LanguagesMenu />
                    <FormItem>
                        {getFieldDecorator('login', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem validateStatus={this.state.error}
                              help={t('Invalid Login or Password')}>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Please input your Password!' }],
                        })(
                            <Input  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
                        <Button loading={login.isRequestLogin}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button">
                            {t('Sign in')}
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
        store: state,
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        onAuth: (params) => dispatch(auth(params)),
        onCheck: () => dispatch(loginCheck())
       // onAuth: () => {}
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(WrappedNormalLoginForm));
