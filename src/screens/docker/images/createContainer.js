import React, {Component} from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, InputNumber
} from 'antd';
import {connect} from "react-redux";
import {startContainer} from '../../../actions/docker';
import {style} from './style';


class DrawerForm extends React.Component {
    state = {visible: false};

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = (e) => {
        console.log('handler');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('validate');
            console.log(err);
            if (err) {
                throw new Error('Received values of form');
            }
            console.log(values);
            this.props.startContainer(values)
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer}>
                    <Icon type="plus"/> start container
                </Button>
                <Drawer
                    title="Create a new container"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={style.drawer}
                >
                    <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Container name">
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: 'Please enter container name'
                                        }],
                                    })(<Input placeholder="Please enter container name"/>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Image name">
                                    {getFieldDecorator('image', {
                                        rules: [{
                                            required: true,
                                            message: 'Please enter image name',
                                        }],
                                        initialValue: this.props.image
                                    })(<Input disabled={true}  placeholder="Please enter image name"/>)}

                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="container port">
                                    {getFieldDecorator('container_port', {
                                        rules: [{required: true, message: 'Please enter container port'}],
                                    })(
                                        <InputNumber  placeholder="Please enter container port"/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="exposed_port">
                                    {getFieldDecorator('exposed_port', {
                                        rules: [{required: true, message: 'Please enter exposed port'}],
                                    })(<InputNumber placeholder="Please enter exposed port"/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item style={style.bottomStyleForm}>
                            <Button onClick={this.onClose} style={{marginRight: 8}}> Cancel </Button>
                            <Button htmlType="submit" type="primary"> Submit </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        docker: state.docker
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        startContainer: (params) => dispatch(startContainer(params))
    })
};

const CreateContainer = Form.create()(DrawerForm);
export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);