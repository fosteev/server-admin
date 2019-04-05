import React, {Component} from 'react';
import {
    Menu
} from 'antd';
import {Link} from "react-router-dom";

const {SubMenu, MenuItemGroup} = Menu;
import {connectLanguages} from '../../connectLanguages';

class MenuApp extends React.Component {
    state = {
        path: ''
    }

    componentWillMount() {
        this.updatePath();
        window.onhashchange = function() {
            this.updatePath();
        }
    }

    updatePath() {
        this.setState({
            path: location.pathname
        })
    }

    render() {
        const {t} = this.props;
        return (
            <Menu defaultSelectedKeys={[this.state.path]}
                  onClick={() => this.updatePath()}>

                {this.props.router.map(route => {
                    return <Menu.Item key={route.path}>
                        <Link to={route.path}>
                            <span>{t(route.name)}</span>
                        </Link>
                    </Menu.Item>
                })}

            </Menu>
        )
    }
}

export default connectLanguages(MenuApp);
