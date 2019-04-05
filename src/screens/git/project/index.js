import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProject} from '../../../actions/git';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Table, Button, Timeline, Tree, Skeleton} from 'antd';

const {TreeNode} = Tree;

class GitProject extends React.Component {
    state = {
        name: null,
        status: [],
        branches: [],
        checkedBranches: [],
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
        const {statusText, gitBranches, changes, history} = nextProps.store;
      
        this.setState({
            status: statusText,
            branches: gitBranches,
            checkedBranches: gitBranches ? gitBranches.filter(text => text.indexOf('*') !== -1) : [],
            changes: changes,
            history: history
        })
    }

    getStatus() {
        return this.state.status ? this.state.status.map((text, i) => <p key={i}>{text}</p>) : null;
    }

    getBranches() {
        const {branches} = this.state;
        if (!branches) {
            return null;
        }

        const getTreeNodes = () => branches
            .map(text => ({
                    title: text,
                    key: text
                }
            ))
            .map(item => <TreeNode  {...item} />);

        return <Tree
            checkable
            // onCheck={this.onCheck}
            checkedKeys={this.state.checkedBranches}
        >
            {getTreeNodes()}
        </Tree>
    }

    getChanges() {
        const {changes} = this.state;
        if (!changes) {
            return null;
        }

        let tree = [];

        changes.forEach(item => {
            item.split('/').forEach((text, i, arr) => {
                if (arr[i - 1]) {

                    const pushParent = (text, parentName, arr) => {
                        arr.forEach(item => {
                            if (item.name === parentName) {

                                if (!item.children.find(child => child.name === text)) {
                                    item.children.push({
                                        name: text,
                                        children: []
                                    })
                                }

                            } else {
                                pushParent(text, parentName, item.children);
                            }
                        })
                    }
                    pushParent(text, arr[i - 1], tree);

                } else {
                    if (!tree.find(item => item.name === text)) {
                        tree.push({
                            name: text,
                            children: []
                        })
                    }
                }
            })
        });

        let uniqKey = 0;

        const getChildrens = node => {
            ++uniqKey;
            const {children} = node;
            const isLeaf = children.length === 0;
            return (<TreeNode title={node.name} key={uniqKey} isLeaf={isLeaf}>
                {!isLeaf ? children.map(child => getChildrens(child)) : null}
            </TreeNode>)
        }

        const DirectoryTree = Tree.DirectoryTree;

        return <DirectoryTree defaultExpandAll>
            {tree.map(root => getChildrens(root))}
        </DirectoryTree>
    }

    getTimeLineHistory() {
        const {history} = this.state;
        if (!history) {
            return null;
        }
        const timeLine = history.map((commit, index) => {
            return <Timeline.Item key={index}>{commit}</Timeline.Item>
        })


        return <Timeline>{timeLine}</Timeline>
    }

    render() {
        return (
            <div>
                <div className="mat-card">
                    <h1>{this.state.name}</h1>
                    {this.getStatus()}
                </div>
                <div className="mat-card">
                    <h1>Branches</h1>
                    {this.getBranches()}
                </div>
                <div className="mat-card">
                    <h1>Changes</h1>
                    {this.getChanges()}
                </div>
                <div className="mat-card">
                    <h1>History</h1>
                    {this.getTimeLineHistory()}
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
