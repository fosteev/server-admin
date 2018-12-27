import {GET_CONTAINERS, GET_IMAGES} from '../actions/docker';
const initialState = {
    url: 'http://localhost:3000/',
    containers: [],
    images: []
};

export default function docker(state = initialState, action) {
    switch (action.type) {
        case GET_CONTAINERS:
            return Object.assign({}, state, {
                containers: action.containers
            });
        case GET_IMAGES:
            return Object.assign({}, state, {
                images: action.images
            });
        default:
            return state;
    }
}
