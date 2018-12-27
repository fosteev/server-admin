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
