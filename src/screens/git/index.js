import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjects} from '../../actions/git';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Table, Button} from 'antd';

class Git extends React.Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    }

    componentWillMount() {
        this.props.getProjects();
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }

    onLeftClick(record) {
        const {name} = record;
        this.props.history.push(`git:${name}`, {
            project: name
        });
    }


    render() {
        const columns = [{
            title: '',
            dataIndex: 'name',
            key: 'name'
        }];
        return (
            <div>
                <div className="mat-card">
                    <h1>Git in project</h1>
                    <Table pagination={false}
                           onRow={(record, rowIndex) => {
                               return {
                                   onClick: (event) => this.onLeftClick(record, event)
                               };
                           }}
                           columns={columns}
                           dataSource={this.props.store.projects.repository ? this.props.store.projects.repository.map((item, i) => {
                               return {
                                   key: i,
                                   name: item
                               }
                           }) : []
                           }
                           onChange={this.handleChange}/>
                </div>

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
