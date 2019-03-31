import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {reqContainers, stopContainer, removeContainer} from '../../../actions/docker';
import {Table, Divider, Tag, Button, notification, message} from 'antd';
import CreateContainer from '../images/createContainer';


const getRow = (v, width) => <p style={{width: `${width}px`}} className={'column'}>{v}</p>


class Images extends React.Component {
    componentDidMount() {
        this.props.getContainers();
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

    stopContainer = record => {
        this.props.stopContainer(record);
        this.openNotifContainer(record);

    }

    render() {
        console.log(this.props.docker.isRequestContainers);
        return (
            <div className={'mat-card'}>
                <h1>Containers</h1>
                <Table
                    bordered
                    size="middle"
                    loading={this.props.docker.isRequestContainers}
                    pagination={false}
                    columns={[{
                        title: 'Container ID',
                        dataIndex: 'id',
                        key: 'id',
                        render: v => getRow(v, 40)
                    }, {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                        render: v => getRow(v, 100)
                    }, {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: v => getRow(v, 100)
                    }, {
                        title: 'Command',
                        dataIndex: 'command',
                        key: 'command',
                        render: v => getRow(v, 100)
                    }, {
                        title: 'Created',
                        key: 'createAt',
                        dataIndex: 'createAt',
                        render: v => getRow(v, 100)
                    }, {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: v => getRow(
                            <Tag color={v.search('Up') !== -1 ? 'green' : 'red'}
                            >{v}</Tag>, 100)
                    }, {
                        title: 'Ports',
                        dataIndex: 'port',
                        key: 'port',
                        render: v => getRow(
                            v.split('->').map(item => item.replace('0.0.0.0:', '')).join(':'),
                            100
                        )
                    }, {
                        title: 'Actions',
                        key: 'actions',
                        dataIndex: 'name',
                        render: (name, record) => {
                            return <div>
                                <Button onClick={() => this.stopContainer(record)} type="dashed">Stop</Button>
                                <Button type="danger" disabled={record.isUp}>Remove</Button>
                            </div>
                        }
                    }]}
                    dataSource={this.props.docker.containers}/>
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
        getContainers: (params) => dispatch(reqContainers(params)),
        stopContainer: (record) => dispatch(stopContainer(record)),
        removeContainer: (record) => dispatch(removeContainer(record))
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(Images);
