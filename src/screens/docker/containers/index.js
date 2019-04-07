import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {reqContainers, stopContainer, stopAndRemoveContainer} from '../../../actions/docker';
import {Table, Divider, Tag, Button, notification, message} from 'antd';
import CreateContainer from '../images/createContainer';


const getRow = (v, width) => <p style={{width: `${width}px`}} className={'column'}>{v}</p>


class Images extends React.Component {
    componentDidMount() {
        this.props.getContainers();
    }


    stopAndRemoveContainer = record => {
        this.props.stopContainer(record);
        this.props.removeContainer(record);
    }

    render() {
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
                        render: v => getRow(v, 125)
                    }, {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: v => getRow(v, 150)
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
                        render: v => v
                    }, {
                        title: 'Actions',
                        key: 'actions',
                        dataIndex: 'name',
                        render: (name, record) => {
                            return <div>
                                <Button onClick={() => this.props.stopAndRemoveContainer(record)}
                                        type="dashed">Stop and remove</Button>
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
        stopAndRemoveContainer: (record) => dispatch(stopAndRemoveContainer(record))
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(Images);
