const backend_url = `http://acdc.pilot-gps.ru:30197/`;

export const REQUEST = 'REQUEST', RESPONSE = 'RESPONSE', FAIL = 'FAIL', UPDATE_STATE = 'UPDATE_STATE';

function request() {
    return {
        type: REQUEST
    }
}

function response() {
    return {
        type: RESPONSE
    }
}

export function updateState(data) {
    console.log(data);
    return {
        type: UPDATE_STATE,
        data: data
    }
}

export function stringParams(params) {
    let arr = [];

    for (const key in params) {
        arr.push(`${key}=${params[key]}`)
    }

    if (arr.length === 0) {
        return '';
    }

    return `?${arr.join('&')}`;
}

export function fetchRequest(dispatch, url, params) {
    // dispatch(onSpinner());
    dispatch(request());
    return new Promise((resolve, reject) => {
        fetch(`${backend_url}${url}${stringParams(params)}`, {
            credentials: 'include'
        }).then((res) => {
            dispatch(response());
            switch (res.status) {
                case 404:
                case 409:
                case 500:
                //return dispatch(onShowFailResponseFromServer(response.text()));
                default:
                //  dispatch(onHideFailResponseFromServer());
            }
            // dispatch(offSpinner());

            res.json().then(json => {
                resolve(json)
            }).catch(() => success());
        })
            .catch((error) => {
                console.log('fetch catch error: ', error);
                //return dispatch(onShowFailResponseFromServer());
            })
    })
}

import {setMessageBox} from './state';

export class Fetch {
    constructor(url) {
        this.url = url;
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }

    paramsToString(params) {
        let arr = [];

        for (const key in params) {
            arr.push(`${key}=${params[key]}`)
        }

        if (arr.length === 0) {
            return '';
        }

        return `?${arr.join('&')}`;
    }

    request(route, method, params) {
        const url = `${this.url}${route}${this.paramsToString(params)}`;
        const options = {
            method: method,
            credentials: 'include'
        };

        return new Promise((resolve, reject) => {
            fetch(url, options).then((res) => {
                switch (res.status) {
                    case 404:
                        reject({
                            status: 404,
                            text: 'Not found page'
                        });
                }

                res.json()
                    .then(json => resolve(json))
                    .catch(error => reject(error));

            }).catch((error) => reject(error));
        })
    }
}