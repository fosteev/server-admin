export const GET_PROJECTS = 'GET_PROJECTS',
    GET_PROJECT = 'GET_PROJECT';


import {Fetch} from "./сonfig";

function gitFetch() {
    return new Fetch('http://localhost:4000/')
}

import {updateMessageBoxState, onLoading, offLoading} from './state';
export function getProjects() {
    return dispatch => {
        gitFetch()
            .request('git', 'GET')
            .then(resp => dispatch({
                type: GET_PROJECTS,
                data: resp
            }))
            .catch(error => {
                //dispatch(updateMessageBoxState(error.status, error.text))
            })
    }
}