import {GET_PROJECTS, GET_PROJECT} from '../actions/git';
const initialState = {
    projects: []
};

export default function git(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            console.log(action);
            return {...state, ...{
                    projects: action.data
                }}
        default:
            return state;
    }
}
