import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {reqImages} from '../../../actions/docker';
import {Table, Divider, Tag, Button} from 'antd';


const columns = [{
    title: 'Image ID',
    dataIndex: 'id',
    key: 'id',
}, {
    title: 'Repository',
    dataIndex: 'name',
    key: 'repository',
    render: text => {
        const textSplit = text.split(':');
        if (textSplit.length === 0) {
            return (<p>None</p>)
        }
        return (<p>{textSplit[0]}</p>)
    },
}, {
    title: 'Tag',
    dataIndex: 'name',
    key: 'tag',
    render: text => {
        const textSplit = text.split(':');
        if (!textSplit[1]) {
            return (<p>None</p>)
        }
        return (<p>{textSplit[1]}</p>)
    },
}, {
    title: 'Size',
    dataIndex: 'megabyte',
    key: 'size',
    render: text => <p>{text}mb</p>
}, {
    title: 'Created',
    key: 'date',
    dataIndex: 'date',
    render: date => (<p>{date.getDay()}-{date.getMonth()}-{date.getFullYear()}</p>),
}, {
    title: 'Actions',
    key: 'actions',
    render: () => <Button type="primary">start</Button>
}];


class Images extends React.Component {
    componentDidMount() {
        this.props.getImages();
    }

    render() {
        return (
            <div>
                <h1>Images</h1>
                <Table pagination={false} columns={columns} dataSource={this.props.docker.images}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Images);
