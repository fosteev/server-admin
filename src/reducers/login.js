import {LOGIN_USER_SUCCESS, LOGOUT_USER, IS_REQUEST_LOGIN, FAIL_LOGIN} from '../actions/login';
const initialState = {
    isAuthenticated: false,
    isRequestLogin: false,
    name: '',
    email: '',
    config: {},
    id: null,
    image: '',
    roleID: null,
    isFail: false
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            const {email, id, image, name, config} = action.data;
            return Object.assign({}, state, {
                isAuthenticated: true,
                isRequestLogin: false,
                email: email,
                id: id,
                image: image,
                name: name,
                config: JSON.parse(config)
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isRequestLogin: false
            });
        case IS_REQUEST_LOGIN:
            return Object.assign({}, state, {
                isRequestLogin: true
            });
        case FAIL_LOGIN:
            return Object.assign({}, state, {
                isRequestLogin: false,
                isAuthenticated: false,
                isFail: true
            })
        default:
            return state;
    }
}
