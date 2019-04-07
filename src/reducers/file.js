import {
    RESPONSE_FILE_CONTENT,
    REQUEST_FILE_CONTENT
} from '../actions/file';

const initialState = {
    isRequest: false,
    content: null,
    parsingContent: []
};

export default function file(state = initialState, action) {
    switch (action.type) {
        case REQUEST_FILE_CONTENT:
            return Object.assign({}, state, {
                isRequest: true
            });
        case RESPONSE_FILE_CONTENT:
            return Object.assign({}, state, {
                isRequest: false,
                content: action.data,
                parsingContent: action.data.split('\n')
            });
        default:
            return state;
    }
}
