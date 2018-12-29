import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {reqContainers} from '../../../actions/docker';
import {Table, Divider, Tag, Button} from 'antd';

class Images extends React.Component {
    componentDidMount() {
        this.props.getContainers();
    }

    render() {
        return (
            <div>
                <h1>Containers</h1>
                <Table pagination={false}
                       columns={[{
                           title: 'Container ID',
                           dataIndex: 'id',
                           key: 'id',
                       }, {
                           title: 'Name',
                           dataIndex: 'name',
                           key: 'name'
                       }, {
                           title: 'Image',
                           dataIndex: 'Image',
                           key: 'image'
                       }, {
                           title: 'Command',
                           dataIndex: 'Command',
                           key: 'command'
                       }, {
                           title: 'Created',
                           key: 'date',
                           dataIndex: 'date',
                           render: date => (<p>{date.getDay()}-{date.getMonth()}-{date.getFullYear()}</p>),
                       }, {
                           title: 'State',
                           dataIndex: 'State',
                           key: 'state'
                       }, {
                           title: 'Status',
                           dataIndex: 'Status',
                           key: 'status'
                       }, {
                           title: 'Ports',
                           dataIndex: 'ports',
                           key: 'state'
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
        getContainers: (params) => dispatch(reqContainers(params))
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(Images);
