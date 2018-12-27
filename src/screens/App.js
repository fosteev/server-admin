import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    Link, Switch, Route
} from 'react-router-dom';

import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Containers from './docker/containers';
const routes = [{
    name: 'index',
    path: '/',
    component: () => <div>welcome</div>
}, {
    name: 'containers',
    path: '/containers',
    component: Containers
}]

class App extends React.Component {
    getRoute(name) {
        const find = routes.find(route => route.name === name);
        if (find) {
            return find;
        }
        return null;
    }

    render() {
        const {login} = this.props;
        const containers = this.getRoute('containers');
        const index = this.getRoute('index');
        return (
            <Layout>
                <Header className="header">
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user" />Docker</span>}>
                                <Menu.Item key="1">
                                    <Link to={containers.path}>
                                        <Icon type="idcard"/>
                                        <span>Containers</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">Images</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            <Switch>
                                <Route path={containers.path} component={containers.component}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )    }
}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

