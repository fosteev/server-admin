import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {reqImages} from '../../../actions/docker';
import {Table, Divider, Tag, Button, notification, message} from 'antd';

import CreateContainer from './createContainer';


class Containers extends React.Component {
    componentDidMount() {
        this.props.getImages();
    }

    openNotifContainer(record) {
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                Confirm
            </Button>
        );
        const openNotification = () => {
            notification.open({
                message: 'Notification Title',
                description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                btn,
                key: 'keyRequestContainer',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        };
        openNotification();
    }



    render() {
        return (
            <div className={'mat-card'}>
                <h1>Images</h1>
                <Table pagination={false}
                       loading={this.props.docker.isRequestImages}
                       columns={[{
                           title: 'Image ID',
                           dataIndex: 'imageId',
                           key: 'imageId',
                       },  {
                           title: 'Name',
                           dataIndex: 'name',
                           key: 'name'
                       },  {
                           title: 'Tag',
                           dataIndex: 'tag',
                           key: 'tag'
                       }, {
                           title: 'Size',
                           dataIndex: 'size',
                           key: 'size'
                       }, {
                           title: 'Created',
                           key: 'createAt',
                           dataIndex: 'createAt'
                       }, {
                           title: 'Actions',
                           key: 'actions',
                           dataIndex: 'name',
                           render: (name) => {
                               return <CreateContainer image={name}/>
                           }
                       }]}
                       dataSource={this.props.docker.images}/>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        docker: state.docker
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getImages: (params) => dispatch(reqImages(params))
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(Containers);
