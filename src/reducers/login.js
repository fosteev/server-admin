import {LOGIN_USER_SUCCESS, LOGOUT_USER} from '../actions/login';
const initialState = {
    isAuthenticated: false
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, {
                isAuthenticated: true
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false
            });
        default:
            return state;
    }
}
