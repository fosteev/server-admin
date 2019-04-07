export const GET_FILE_CONTENT = 'GET_FILE_CONTENT';
export const REQUEST_FILE_CONTENT = 'REQUEST_FILE_CONTENT';
export const RESPONSE_FILE_CONTENT = 'RESPONSE_FILE_CONTENT';

function requestFile() {
    return {
        type: REQUEST_FILE_CONTENT
    }
}


import {request} from "./main";

export function getFileContent(file) {
    return dispatch => {
        dispatch(requestFile());
        request(`repository/dockerfiles/file/${file}`, 'GET')
            .then(resp => dispatch({
                type: RESPONSE_FILE_CONTENT,
                data: resp
            }))
    }
}
