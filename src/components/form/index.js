import React, {Component} from 'react';
import {
    Form, Checkbox, Button, Drawer
} from 'antd';

class BaseForm extends Component {
    state = {
        confirmDirty: false,
        visible: false
    };

    closeForm = () => {
        this.setState({
            visible: false,
        });
        if (this.props.close) {
            this.props.close();
        }
    }

    handleOk = (e) => {
        this.closeForm();
    }

    handleCancel = (e) => {
        this.closeForm();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isVisible} = nextProps;
        if (typeof isVisible === 'boolean') {
            this.setState({
                visible: isVisible
            });
        } else {
            console.error('Fail type visible props.');
        }

    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const {fields} = this.props;

        if (!(fields && (fields.length > 0))) {
            throw new Error('Empty fields');
        }

        return (
            <Drawer
                title="Basic Modal"
                width={700}
                visible={this.state.visible}
                onOk={this.handleOk}
                onClose={this.handleCancel}
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    {fields.map((field, index) => {
                        return (
                            <Form.Item key={index} label={field.label} extra={field.extra}>
                                {getFieldDecorator(field.nameFieldDecorator, {
                                    initialValue: field.initialValue,
                                    rules: field.rules
                                })(field.render())}
                            </Form.Item>
                        )
                    })}
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        );
    }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(BaseForm);
export default WrappedRegistrationForm;