export const LOGOUT_USER = 'LOGOUT_USER',
    LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export function login() {
    return {
        type: LOGIN_USER_SUCCESS
    }
}

export function outlogin(data) {
    return {
        type: LOGOUT_USER
    }
}

export function auth(params, action) {
    return dispatch => {
        dispatch(login());
    };
}
