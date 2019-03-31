import React, {Component} from 'react';
import {connect} from "react-redux";
import {notification} from '../actions/state';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {connectLanguages} from '../connectLanguages';
import {
    Link, Switch, Route
} from 'react-router-dom';
import {
    Layout, Menu, Breadcrumb, Button
} from 'antd';


const {SubMenu, MenuItemGroup} = Menu;
const {Header, Content, Sider} = Layout;

import HeaderApp from './main/header';
import MenuApp from './main/menu';

import Notification from '../components/notification';
import Images from './docker/images';
import Containers from './docker/containers';

import Map from './map';
import {request} from "../actions/main";
import {login} from "../actions/login";

const routes = [{
    name: 'Map',
    path: '/map',
    component: Map
}, {
    name: 'Images',
    path: '/images',
    component: Images
}, {
    name: 'Containers',
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

    componentDidMount() {
        // this.props.setNotification('Page downloaded', 'Welcome download system.', 'download');
    }

    setFirstUpper(str) {
        return str[0].toUpperCase() + str.substring(1);
    }

    getBreadcrumb() {
        const {t} = this.props;
        return this.props.location.pathname.split('/').filter(path => path).map((path, index) => {
            return <Breadcrumb.Item key={index}>{t(this.setFirstUpper(path))}</Breadcrumb.Item>
        })
    }

    render() {
        const {image, name} = this.props.login;
        const map = this.getRoute('map');
        const routers = routes.map((route, index) => {
            return (<Route key={index} path={route.path} component={route.component}/>)
        });
        let path = this.props.location.pathname.replace('/', '');
        const searchIndex = path.search(':');
        if (searchIndex !== -1) {
            path = path.slice(0, searchIndex);
        }

        return (<Layout>
            <HeaderApp/>
            <Layout>
                <Sider width={200}>
                    <MenuApp router={routes}/>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {this.getBreadcrumb()}
                    </Breadcrumb>
                    <Content style={{margin: 0, minHeight: 280}}>
                        <Switch>
                            {routers}
                        </Switch>
                    </Content>
                    <Notification/>
                </Layout>
            </Layout>
        </Layout>)

        if (this.props.login.isAuthenticated) {

        }

        if (window.location.pathname !== '/login') {
            const {history} = this.props;
            request('users/auth', 'GET').then(resp => {
                this.props.saveUser(resp);
                history.replace(window.location.pathname);
            }).catch(() => {
                history.replace('/login');
            })
            return (
                <Layout style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button type="primary" shape="circle" loading />
                </Layout>
            )
        }

        return null;
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
        theme: state.themes.getTheme()
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNotification: (title, text, index) => dispatch(notification(title, text, index)),
        saveUser: (data) => dispatch(login(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(App));

