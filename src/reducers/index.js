import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import login from './login';
import docker from './docker';
import state from './state';
import git from './git';

export default combineReducers({
    routing: routerReducer,
    login,
    docker,
    state,
    git
});
