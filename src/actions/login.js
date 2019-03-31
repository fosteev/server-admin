export const LOGOUT_USER = 'LOGOUT_USER',
    LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
    IS_REQUEST_LOGIN = 'IS_REQUEST_LOGIN',
    FAIL_LOGIN = 'FAIL_LOGIN';

export function login(data) {
    return {
        type: LOGIN_USER_SUCCESS,
        data: data
    }
}

export function outlogin(data) {
    return {
        type: LOGOUT_USER
    }
}

export function failLogin(text) {
    return {
        type: FAIL_LOGIN,
        text: text
    }
}

export function requestLogin() {
    return {
        type: IS_REQUEST_LOGIN
    }
}

import {request} from "./main";

export function loginCheck() {
    return dispatch => {
        request('users/auth', 'GET').then(resp => {
            dispatch(login(resp))
        }).catch(() => dispatch(outlogin()))
    }
}

export function auth(params, action) {
    return dispatch => {
        dispatch(requestLogin());
        request('users/auth', 'POST', params).then(resp => {
            dispatch(login(resp))
        }).catch(resp => dispatch(failLogin(resp.statusText)))
    }
}

export function loginOut() {
    return dispatch => {
        request('users/auth', 'DELETE').then(resp => {
            dispatch(outlogin())
        })
    }
}
