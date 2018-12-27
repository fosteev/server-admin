export const GET_CONTAINERS = 'GET_CONTAINERS',
    GET_IMAGES = 'GET_IMAGES';

const url = 'http://localhost:3000/'

import {stringParams} from './сonfig';

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
    return dispatch => {
        request('/containers').then(response => {
            console.log(response);
        })
    };
}
