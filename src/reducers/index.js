import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import login from './login';
import state from './state';
import languages from './languages';
import themes from './themes';
import git from './git';
import docker from './docker';
import file from './file';

export default combineReducers({
    routing: routerReducer,
    login,
    state,
    languages,
    themes,
    git,
    docker,
    file
});
