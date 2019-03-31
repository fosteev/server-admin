import React, {Component} from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const {Option} = Select;
const AutoCompleteOption = AutoComplete.Option;
import FormFields from '../form';
import {connect} from "react-redux";
import {showForm} from '../../actions/state';

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

const formName = 'register';

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        isOpenForm: false
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isVisibleForm} = nextProps;
        if (this.state.isOpenForm !== isVisibleForm) {
            this.setState({
                isOpenForm: isVisibleForm
            })
        }
    }

    closeForm = () => {
        this.props.openForm({
            name: formName,
            isVisible: false
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        const fields = [{
            label: "E-mail",
            nameFieldDecorator: 'email',
            rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
            }, {
                required: true, message: 'Please input your E-mail!',
            }],
            render: () => <Input/>
        }, {
            label: "Password",
            nameFieldDecorator: 'password',
            rules: [{
                required: true, message: 'Please confirm your password!',
            }, {
                validator: this.validateToNextPassword,
            }],
            render: () => <Input/>
        }, {
            label: "Confirm Password",
            nameFieldDecorator: 'confirm',
            rules: [{
                required: true, message: 'Please confirm your password!',
            }, {
                validator: this.compareToFirstPassword,
            }],
            render: () => <Input type="password" onBlur={this.handleConfirmBlur}/>
        }, {
            label: (
                <span>
              Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
            ),
            nameFieldDecorator: 'nickname',
            rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
            render: () => <Input/>
        }, {
            label: "Habitual Residence",
            nameFieldDecorator: 'phone',
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{type: 'array', required: true, message: 'Please select your habitual residence!'}],
            render: () => (<Cascader options={residences}/>)
        }, {
            label: "Phone Number",
            nameFieldDecorator: 'residence',
            rules: [{required: true, message: 'Please input your phone number!'}],
            render: () => (<Input addonBefore={prefixSelector} style={{width: '100%'}}/>)
        }, {
            label: "Website",
            nameFieldDecorator: 'website',
            rules: [{required: true, message: 'Please input website!'}],
            render: () => (
                <AutoComplete
                    dataSource={websiteOptions}
                    onChange={this.handleWebsiteChange}
                    placeholder="website"
                >
                    <Input/>
                </AutoComplete>
            )
        }, {
            label: "Captcha",
            extra: "We must make sure that your are a human.",
            nameFieldDecorator: 'captcha',
            rules: [{required: true, message: 'Please input website!'}],
            render: () => (
                <Row gutter={8}>
                    <Col span={12}>
                        {getFieldDecorator('captcha', {
                            rules: [{required: true, message: 'Please input the captcha you got!'}],
                        })(
                            <Input/>
                        )}
                    </Col>
                    <Col span={12}>
                        <Button>Get captcha</Button>
                    </Col>
                </Row>
            )
        }]
        return (
            <FormFields close={() => this.closeForm()} isVisible={this.state.isOpenForm} fields={fields} formName={formName}/>
        );
    }
}

const mapStateToProps = state => {
    const {form} = state.state;
    return {
        isVisibleForm: form.name === formName ? form.visible : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        openForm: (options) => dispatch(showForm(options))
    }
};

const WrappedRegistrationForm = Form.create({name: formName})(RegistrationForm);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
