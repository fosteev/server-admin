import React, {Component} from 'react';
import {connect} from "react-redux";
import {reqImages} from '../../../actions/docker';
import {Table, Tag, notification} from 'antd';

import CreateContainer from './createContainer';


class Containers extends React.Component {
    componentDidMount() {
        this.props.getImages();
    }

    openNotifContainer(record) {
        const {dockerResponse} = record;
        let text = dockerResponse;

        if (dockerResponse.search('is already in use by ') != -1) {
            text = `It seems that the container name is used`
        }

        const openNotification = () => {
            notification['error']({
                message: 'Container start failed',
                description: text,
                key: 'keyRequestContainer'
            });
        };
        openNotification();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {sendContainer} = nextProps.docker;
        if (sendContainer && sendContainer.fail.dockerResponse) {
            this.openNotifContainer(sendContainer.fail);
        }
    }


    render() {
        return (
            <div className={'mat-card'}>
                <h1>Images</h1>
                <Table pagination={false}
                       bordered
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
