export const GET_CONTAINERS = 'GET_CONTAINERS';
export const GET_IMAGES = 'GET_IMAGES';
export const REQUEST_CONTAINER = 'REQUEST_CONTAINER';
export const RESPONSE_CONTAINER = 'RESPONSE_CONTAINER';
export const FAIL_CONTAINER = 'FAIL_CONTAINER';
export const REQUEST_CONTAINERS = 'REQUEST_CONTAINERS';
export const REQUEST_IMAGES = 'REQUEST_IMAGES';

import {
    message
} from 'antd';

export function requestContainers() {
    return {
        type: REQUEST_CONTAINERS
    }
}

export function requestImages() {
    return {
        type: REQUEST_IMAGES
    }
}

export function getContainers(containers) {
    return {
        type: GET_CONTAINERS,
        containers: containers
    }
}

export function requestContainer(params) {
    message.loading('Container in progress..', 0);
    return {
        type: REQUEST_CONTAINER,
        container: params
    }
}

export function responseContainer(id) {
    return {
        type: RESPONSE_CONTAINER,
        id: id
    }
}

export function failContainer(fail) {
    return {
        type: FAIL_CONTAINER,
        fail: fail
    }
}

export function getImages(images) {
    return {
        type: GET_IMAGES,
        images: images
    }
}

import {request} from "./main";

export function reqImages() {
    return dispatch => {
        dispatch(requestImages());
        request('docker/images', 'GET')
            .then(resp => dispatch(getImages(resp)))
    }
}

export function reqContainers() {
    return dispatch => {
        dispatch(requestContainers());
        request('docker/containers', 'GET')
            .then(resp => dispatch(getContainers(resp)))
    }

}

export function startContainer(params) {
    return dispatch => {
        dispatch(requestContainer(params));
        request('docker/containers', 'POST', params)
            .then(resp => {
                message.destroy();
                message.success('Container has been started', 5);
                dispatch(responseContainer(resp))
                dispatch(reqContainers());
            })
            .catch(err => {
                message.destroy();
                message.error('Container not created', 5);
                dispatch(failContainer(err))
            });
    }

}

export function stopContainer(container) {
    return dispatch => {
        dispatch(requestContainer(container));
        request(`docker/containers/${container.id}`, 'PUT')
            .then(resp => {
                message.destroy();
                message.success('Container has been stop, id: ' + resp, 5);
                dispatch(responseContainer(resp));
                dispatch(reqContainers());
            });
    }
}

export function removeContainer(container) {
    return dispatch => {
        dispatch(requestContainer(container));
        request('docker/containers/${container.id}', 'DELETE')
            .then(resp => {
                message.destroy();
                message.success('Container has been removed, id: ' + resp, 5);
                dispatch(responseContainer(resp));
                dispatch(reqContainers());
            })
    }
}


