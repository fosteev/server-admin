import React, {Component} from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

const PrivateRoute = ({component: Component, login, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (login.isAuthenticated) {
                    return <Component {...props} />
                } else {
                    console.log('redirect logind');
                    return <Redirect to="/loading"/>
                }
            }}
        />
    );
};

export default PrivateRoute;
