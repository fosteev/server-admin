import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjects} from '../../actions/git';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Button } from 'antd';

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
}];

class Git extends React.Component {
    componentWillMount() {
        this.props.getProjects();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }];
        return (
            <div>
                <h1>Git in project</h1>
                <div className="table-operations">
                    <Button type={'primary'} icon="download"> Clone </Button>
                </div>
                <Table pagination={false}
                       columns={columns}
                       dataSource={this.props.store.projects.map(item => {
                           return {
                               name: item
                           }
                       })}
                       onChange={this.handleChange} />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        store: state.git
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getProjects: () => dispatch(getProjects())
    })
};
//export default Dashboard;

export default connect(mapStateToProps, mapDispatchToProps)(Git);
