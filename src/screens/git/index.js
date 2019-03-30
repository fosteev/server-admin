import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjects} from '../../actions/git';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Table, Button} from 'antd';

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

    onLeftClick(record) {
        const {name} = record;
        this.props.history.push(`git:${name}`, {
            project: name
        });
    }


    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }];
        console.log(this.props.store.projects);
        return (
            <div>
                <h1>Git in project</h1>
                <div className="table-operations">
                    <Button type={'primary'} icon="download"> Clone </Button>
                </div>
                <div className="mat-card">
                    <Table pagination={false}
                           onRow={(record, rowIndex) => {
                               return {
                                   onClick: (event) => this.onLeftClick(record, event)
                               };
                           }}
                           columns={columns}
                           dataSource={this.props.store.projects.repository ? this.props.store.projects.repository.map(item => {
                               return {
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
