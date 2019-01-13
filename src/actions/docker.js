export const GET_CONTAINERS = 'GET_CONTAINERS',
    GET_IMAGES = 'GET_IMAGES';

const url = 'http://localhost:4000/docker'

import {stringParams, Fetch, server_api_url} from './сonfig';

export function getContainers(containers) {
    return {
        type: GET_CONTAINERS,
        containers: containers
    }
}

export function getImages(images) {
    return {
        type: GET_IMAGES,
        images: images
    }
}

function dockerFetch() {
    return new Fetch(server_api_url);
}

function request(route, params) {
    return new Promise((resolve, reject) => {
        fetch(`${url}${route}${stringParams(params)}`, {
            credentials: 'include'
        }).then((res) => {

            res.json().then(json => {
                resolve(json)
            });

        }).catch((error) => {
            console.log('fetch catch error: ', error);
            //return dispatch(onShowFailResponseFromServer());
        })

    })
}

export function reqContainers(params, action) {
    return dispatch => request('/containers').then(response => dispatch(getContainers(response)));
}

export function reqImages(params, action) {
    return dispatch => request('/images').then(response => dispatch(getImages(response)));
}

import {updateMessageBoxState, onLoading, offLoading} from './state';

export function startContainer(params) {
    return dispatch => {
        dispatch(onLoading());
        dockerFetch().request('/containers', 'POST', params).then(resp => {
            dispatch(offLoading());
            console.log(resp);

        }).catch(res => {
            dispatch(offLoading());
            dispatch(updateMessageBoxState(res.status, res.text));
        })
    }
}
