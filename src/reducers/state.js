import {SET_MESSAGE, SET_LOADING, GET_SYSTEM} from '../actions/state';
const initialState = {
    messageBox: {
        status: null,
        params: {},
        text: null
    },
    isLoading: false,
    system: {
        platform: null,
        release: null,
        homedir: null,
        upTime: null
    }
};

export default function docker(state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return Object.assign({}, state, {
                messageBox: {
                    status: action.status,
                    params: action.params,
                    text: action.text
                }
            });
        case SET_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            })
        case GET_SYSTEM:
            return {...state, ...{
                    system: {
                        platform: action.platform,
                        release: action.release,
                        homedir: action.homedir,
                        upTime: action.upTime
                    }
                }}
        default:
            return state;
    }
}
