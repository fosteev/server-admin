import React, {Component} from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon, InputNumber, message
} from 'antd';
import {connect} from "react-redux";
import {reqBuildImage} from '../../../actions/docker';

class DrawerForm extends React.Component {
    state = {
        actionMessage: '',
        path: '',
        visible: false
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.visible) {
            this.showDrawer();
            this.setState({
                path: nextProps.path
            })
        }
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });

    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        if (this.props.onClose) {
            this.props.onClose()
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                throw new Error('Received values of form');
            }
            const {path, name} = values;
            const pathToFile = path.replaceAll('/', '-');
            console.log(pathToFile);
            console.log(name);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Drawer title="Build image"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
            >
                <Form layout="vertical" hideRequiredMark onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Executable file">
                                {getFieldDecorator('path', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter container name'
                                    }],
                                    initialValue: this.state.path.replaceAll('-', '/')
                                })(<Input disabled placeholder="Please enter container name"/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Image name">
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter image name',
                                    }]
                                })(<Input placeholder="Please enter image name"/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button onClick={this.onClose} style={{marginRight: 8}}> Cancel </Button>
                        <Button htmlType="submit" type="primary"> Submit </Button>
                    </Form.Item>
                </Form>
            </Drawer>
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
        reqBuildImage: (params) => dispatch(reqBuildImage(params))
    })
};

const BuildImage = Form.create()(DrawerForm);
export default connect(mapStateToProps, mapDispatchToProps)(BuildImage);