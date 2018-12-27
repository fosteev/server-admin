import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import login from './login';
import docker from './docker';

export default combineReducers({
    routing: routerReducer,
    login,
    docker
});
