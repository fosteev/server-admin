import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProject} from '../../../actions/git';
import {getDockerFiles} from '../../../actions/docker';
import {getFileContent} from '../../../actions/file';
import {Typography, Empty, Timeline, Tree, Skeleton, Modal} from 'antd';
import {TreeNodes} from '../../../components';
import Highlight from 'react-highlight';

const {Title, Paragraph} = Typography;

const {TreeNode} = Tree;

class GitProject extends React.Component {
    state = {
        name: null,
        status: [],
        branches: [],
        checkedBranches: [],
        history: [],
        changes: [],
        dockerFiles: [],
        isModalVisible: false,
        modalHeaderText: ''
    }

    componentWillMount() {
        const projectName = this.props.location.state.project;
        this.setState({
            name: projectName
        })
        this.props.getProject(projectName);
        this.props.getDockerFiles(projectName);
    }

    componentWillReceiveProps(nextProps) {
        const {statusText, gitBranches, changes, history} = nextProps.store;
        const {dockerFiles} = nextProps.docker;

        this.setState({
            status: statusText,
            branches: gitBranches,
            checkedBranches: gitBranches ? gitBranches.filter(text => text.indexOf('*') !== -1) : [],
            changes: changes,
            history: history,
            dockerFiles: dockerFiles
        })
    }

    getStatus() {
        return this.state.status ? this.state.status.map((text, i) => <Paragraph key={i}>{text}</Paragraph>) : null;
    }

    getBranches() {
        const {branches} = this.state;
        if (!branches) {
            return <Skeleton active/>;
        }

        if (branches.length === 0) {
            return <Empty/>
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
            return <Skeleton active/>;
        }

        if (changes.length === 0) {
            return <Empty/>
        }

        return <TreeNodes data={changes}
                          contextMenu={[{
                              name: 'View',
                              icon: 'file',
                              key: 'view',
                              onClick: (record) => {
                                  this.setState({
                                      isModalVisible: true,
                                      modalHeaderText: 'Docker file'
                                  })
                                  const {pathFile} = record;
                                  this.props.getFileContent(`${this.state.name.replace('-', '=')}-${pathFile.replaceAll('/', '-')}`);
                              }
                          }]}/>
    }

    getDockerFiles() {
        const {dockerFiles} = this.state;
        if (!dockerFiles) {
            return <Skeleton active={true}/>
        }

        if (dockerFiles.length === 0) {
            return <Empty/>
        }

        return <TreeNodes
            contextMenu={[{
                name: 'View',
                icon: 'file',
                key: 'view',
                onClick: (record) => {
                    this.setState({
                        isModalVisible: true,
                        modalHeaderText: 'Docker file'
                    })
                    const {pathFile} = record;
                    this.props.getFileContent(`${this.state.name}-${pathFile.replaceAll('/', '-')}`);
                }
            }, {
                name: 'Run build',
                key: 'build',
                icon: 'play-circle'
            }]}
            data={dockerFiles}/>
    }

    onCancelModal = () => {
        this.setState({
            isModalVisible: false
        })
    }

    getTimeLineHistory() {
        const {history} = this.state;
        if (!history) {
            return <Skeleton active/>;
        }

        if (history.length === 0) {
            return <Empty/>
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
                    <Title level={3}>{this.state.name}</Title>
                    {this.getStatus()}
                </div>
                <div className="mat-card">
                    <Title level={3}>Docker</Title>
                    {this.getDockerFiles()}
                </div>
                <div className="mat-card">
                    <Title level={3}>Branches</Title>
                    {this.getBranches()}
                </div>
                <div className="mat-card">
                    <Title level={3}>Changes</Title>
                    {this.getChanges()}
                </div>
                <div className="mat-card">
                    <Title level={3}>History</Title>
                    {this.getTimeLineHistory()}
                </div>
                <Modal
                    title={this.state.modalHeaderText}
                    visible={this.state.isModalVisible}
                    centered={true}
                    //onOk={this.handleOk}
                    okButtonProps={{
                        style: {
                            display: 'none'
                        }
                    }}
                    onCancel={this.onCancelModal}
                >
                    <Highlight languages={['javascript']}>
                        {this.props.file.content}
                    </Highlight>

                </Modal>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        store: state.git.project,
        docker: state.docker,
        file: state.file
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getProject: (name) => dispatch(getProject(name)),
        getDockerFiles: (name) => dispatch(getDockerFiles(name)),
        getFileContent: (file) => dispatch(getFileContent(file))
    })
};
//export default Dashboard;

export default connect(mapStateToProps, mapDispatchToProps)(GitProject);
