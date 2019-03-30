import React, {Component} from 'react';
import {connect} from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Link, Switch, Route
} from 'react-router-dom';

import {
    Layout, Menu, Breadcrumb, Icon, message
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Containers from './docker/containers';
import Images from './docker/images';
import Dashboard from './dashboard';
import Git from './git';
import GitProject from './git/project';

const routes = [{
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
}, {
    name: 'images',
    path: '/images',
    component: Images
}, {
    name: 'containers',
    path: '/containers',
    component: Containers
}, {
    name: 'git',
    path: '/git',
    component: Git
}, {
    name: 'git',
    path: '/git:name',
    component: GitProject
}]

class App extends React.Component {
    getRoute(name) {
        const find = routes.find(route => route.name === name);
        if (find) {
            return find;
        }
        return null;
    }

    componentWillReceiveProps(nextProps) {
        const {state} = nextProps;
        const {messageBox, isLoading} = state;

        if (isLoading) {
            message.loading('Response...', 5000);
        } else {
            message.destroy();
        }

        if (messageBox.status) {
            message.error(messageBox.text);
        }
    }

    render() {
        const {login} = this.props;
        const containers = this.getRoute('containers');
        const images = this.getRoute('images');
        const dashboard = this.getRoute('dashboard');
        const git = this.getRoute('git');
        const routers = routes.map((route, index) => {
            return (<Route key={index} path={route.path} component={route.component}/>)
        });
        let path = this.props.location.pathname.replace('/', '');
        const searchIndex = path.search(':');
        if (searchIndex !== -1) {
            path = path.slice(0, searchIndex);
        }
        return (
            <Layout>
                <Header className="header">
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[path]}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key={dashboard.name}>
                                <Link to={dashboard.path}>
                                    <FontAwesomeIcon icon={['fas', 'desktop']} />
                                    <span> Dashboard</span>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="docker" title={<span><FontAwesomeIcon icon={['fab', 'docker']} /> Docker</span>}>
                                <Menu.Item key={containers.name}>
                                    <Link to={containers.path}>
                                        <FontAwesomeIcon icon={['fas', 'server']} />
                                        <span> Containers</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key={images.name}>
                                    <Link to={images.path}>
                                        <FontAwesomeIcon icon={['fas', 'save']} />
                                        <span> Images</span>
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key={git.name}>
                                <Link to={git.path}>
                                    <FontAwesomeIcon icon={['fab', 'git']} />
                                    <span> Git</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content>
                            <Switch>
                                {routers}
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        state: state.state
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

