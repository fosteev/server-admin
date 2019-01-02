export const SET_MESSAGE = 'SET_MESSAGE',
    SET_LOADING = 'SET_LOADING', GET_SYSTEM = 'GET_SYSTEM';


export function updateMessageBoxState(status, text, params) {
    return {
        type: SET_MESSAGE,
        status: status,
        text: text,
        params: params
    }
}

export function setMessageBoxState(status, text, params) {
    return dispatch => dispatch(updateMessageBoxState(status, text, params))
}

export function setMessageBox(resp) {
    switch (resp.status) {
        case 404:
            return updateMessageBoxState(404, 'Not found page');
    }
}

export function onLoading() {
    return {
        type: SET_LOADING,
        isLoading: true
    }
}

export function offLoading() {
    return {
        type: SET_LOADING,
        isLoading: false
    }
}

import {Fetch} from "./сonfig";

function stateFetch() {
    return new Fetch('http://localhost:3000/')
}

export function getSystem() {
    return dispatch => {
        stateFetch()
            .request('', 'GET')
            .then(resp => dispatch({
                type: GET_SYSTEM,
                platform: resp.platform,
                release: resp.release,
                upTime: resp.upTime,
                homedir: resp.homedir
            }))
    }
}