import {
    GET_CONTAINERS,
    GET_IMAGES,
    REQUEST_CONTAINER,
    RESPONSE_CONTAINER,
    FAIL_CONTAINER,
    REQUEST_CONTAINERS,
    REQUEST_IMAGES
} from '../actions/docker';

const initialState = {
    url: 'http://localhost:3000/',
    containers: [],
    images: [],
    isRequestContainers: false,
    isRequestImages: false,
    sendContainer: {
        isRequest: false,
        name: '',
        image: '',
        outPort: null,
        inPort: null,
        containerId: null,
        fail: {}
    }
};

export default function docker(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CONTAINERS:
            return Object.assign({}, state, {
                isRequestContainers: true
            });
        case REQUEST_IMAGES:
            return Object.assign({}, state, {
                isRequestImages: true
            });
        case GET_CONTAINERS:
            return Object.assign({}, state, {
                isRequestContainers: false,
                containers: action.containers.map(container => {
                    container['isUp'] = container.status.search('Up') !== -1
                    return container
                })
            });
        case GET_IMAGES:
            return Object.assign({}, state, {
                isRequestImages: false,
                images: action.images
            });
        case REQUEST_CONTAINER:
            return Object.assign({}, state, {
                sendContainer: {
                    ...state.sendContainer,
                    isRequest: true,
                    ...action.container
                }

            });
        case RESPONSE_CONTAINER:
            console.log('set requeest false');
            return Object.assign({}, state, {
                sendContainer: {
                    ...state.sendContainer,
                    isRequest: false,
                    containerId: action.id
                }
            });
        case FAIL_CONTAINER:
            return Object.assign({}, state, {
                sendContainer: {
                    ...state.sendContainer,
                    isRequest: false,
                    fail: action.fail
                },
            });
        default:
            return state;
    }
}
