import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProject} from '../../../actions/git';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Table, Button, Timeline, Tree} from 'antd';

class GitProject extends React.Component {
    state = {
        name: null,
        history: [],
        changes: []
    }
    componentWillMount() {
        const projectName = this.props.location.state.project;
        this.setState({
            name: projectName
        })
        this.props.getProject(projectName);
    }

    componentWillReceiveProps(nextProps) {
        const {store} = nextProps;
        if (store.history) {
            const timeLine = this.getTimeLineHistory(store);
            this.setState({
                history: timeLine
            })
        }
        if (store.changes) {
            const treeChanges = this.getTreeChanges(store);
        }
    }

    getTimeLineHistory(store) {
        const history = store.history.map((commit, index) => {
            return <Timeline.Item key={index}>{commit}</Timeline.Item>
        })

        return <Timeline>{history}</Timeline>
    }

    getTreeChanges(store) {
        const files = store.changes.map(path => <p style={{fontSize: '20px'}}>{path}</p>)
        this.setState({
            changes: files
        })
    }


    render() {
        return (
           <div>
               <div className="mat-card">
                   <h1>{this.state.name}</h1>
               </div>
               <div className="mat-card">
                   <h1>Changes</h1>
                   {this.state.changes}
               </div>
               <div className="mat-card">
                   <h1>History</h1>
                   {this.state.history}
               </div>
           </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        store: state.git.project
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getProject: (name) => dispatch(getProject(name))
    })
};
//export default Dashboard;

export default connect(mapStateToProps, mapDispatchToProps)(GitProject);
