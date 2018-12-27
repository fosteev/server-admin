import React, {Component} from 'react'
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import {connect} from 'react-redux';

import App from './App';
import Login from './Login';
import PrivateRoute from '../PrivateRoute';

class Routing extends Component {
    render() {
        const {login} = this.props;
        return (
            <BrowserRouter>
                <div className='router'>
                    <Route  path={'/'} login={login} component={App}/>
                    <Route  path={'/Login'} component={Login}/>
                </div>
            </BrowserRouter>
        );
    }

}

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(Routing);
