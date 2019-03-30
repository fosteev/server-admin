import {GET_PROJECTS, GET_PROJECT} from '../actions/git';
const initialState = {
    projects: [],
    project: {}
};

export default function git(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {...state, ...{
                    projects: action.data
                }}
        case GET_PROJECT:
            return {...state, ...{
                    project: action.data
                }}
        default:
            return state;
    }
}
