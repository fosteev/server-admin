export const GET_CONTAINERS = 'GET_CONTAINERS';
export const GET_IMAGES = 'GET_IMAGES';
export const REQUEST_CONTAINER = 'REQUEST_CONTAINER';
export const RESPONSE_CONTAINER = 'RESPONSE_CONTAINER';
export const FAIL_CONTAINER = 'FAIL_CONTAINER';
export const REQUEST_CONTAINERS = 'REQUEST_CONTAINERS';
export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const GET_DOCKER_FILES = 'GET_DOCKER_FILES';
export const REQUEST_BUILD_IMAGE = 'REQUEST_BUILD_IMAGE';
export const RESPONSE_BUILD_IMAGE = 'RESPONSE_BUILD_IMAGE';

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

function reqStopContainer(container) {
    return new Promise(resolve => {
        request(`docker/containers/${container.id}`, 'PUT')
            .then(resp => resolve(resp))
    })
}

export function stopContainer(container) {
    return dispatch => {
        dispatch(requestContainer(container));
        reqStopContainer.then(resp => {
            message.destroy();
            message.success('Container has been stop, id: ' + resp, 5);
            dispatch(responseContainer(resp));
            dispatch(reqContainers());
        })
    }
}

function reqRemoveContanier(container) {
    return new Promise(resolve => {
        request(`docker/containers/${container.id}`, 'DELETE')
            .then(resp => resolve(resp))
    })
}

export function removeContainer(container) {
    return dispatch => {
        dispatch(requestContainer(container));
        reqRemoveContanier().then(resp => {
            message.destroy();
            message.success('Container has been removed, id: ' + resp, 5);
            dispatch(responseContainer(resp));
            dispatch(reqContainers());
        })
    }
}

export function stopAndRemoveContainer(container) {
    return dispatch => {
        dispatch(requestContainer(container));
        reqStopContainer(container).then(resp => {
            reqRemoveContanier(container).then(resp => {
                message.destroy();
                message.success('Container has been removed, id: ' + resp, 5);
                dispatch(responseContainer(resp));
                dispatch(reqContainers());
            })
        })
    }
}

export function getDockerFiles(projectName) {
    return dispatch => {
        request(`repository/dockerfiles/${projectName}`, 'GET')
            .then(resp => {
                dispatch({
                    type: GET_DOCKER_FILES,
                    data: resp
                })
            })
    }
}

function requestBuildImage() {
    message.loading('Building in progress..', 0);
    return {
        type: REQUEST_BUILD_IMAGE
    }
}

function responseBuildImage(data) {
    message.destroy();
    message.success('Image build success', 5);
    return {
        type: RESPONSE_BUILD_IMAGE,
        data: data
    }
}

export function reqBuildImage(params) {
    return dispatch => {
        dispatch(requestBuildImage());
        request('docker/images', 'POST', params).then(resp => {
            dispatch(responseBuildImage(resp))
        })
    }
}
