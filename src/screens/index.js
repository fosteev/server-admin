import React, {Component} from 'react'
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import {connect} from 'react-redux';

import App from './App';
import Login from './Login';
import PrivateRoute from '../PrivateRoute';
import Style from 'style-it';
import {changeTheme} from "../actions/themes";

class Routing extends Component {
    componentWillMount() {
        this.setThemeFromLocalStorage();
    }

    setThemeFromLocalStorage() {
        const name = localStorage.getItem('theme');
        if (name) {
            this.props.onChangeTheme(name);
        }
    }

    render() {
        const {login} = this.props;
        return (
            <BrowserRouter>
                <div className='router'>
                    <Style>{this.props.theme.css()}</Style>
                    <Route path={'/'} login={login} component={App}/>
                    <Route path={'/login'} component={Login}/>
                </div>
            </BrowserRouter>
        );
    }

}

const mapStateToProps = state => {
    return {
        login: state.login,
        theme: state.themes.getTheme(),

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTheme: name => dispatch(changeTheme(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing);
