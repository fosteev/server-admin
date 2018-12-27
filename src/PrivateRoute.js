import React, {Component} from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, login, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                login.isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            )}
        />
    );
};

export default PrivateRoute;
