import {
    GET_CONTAINERS,
    GET_IMAGES,
    REQUEST_CONTAINER,
    RESPONSE_CONTAINER,
    FAIL_CONTAINER,
    REQUEST_CONTAINERS,
    REQUEST_IMAGES,
    GET_DOCKER_FILES,
    REQUEST_BUILD_IMAGE,
    RESPONSE_BUILD_IMAGE
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
    },
    buildImage: {
        isRequest: false,
        fail: {}
    },
    dockerFiles: []
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
                    ...action.container,
                    fail: {}
                }

            });
        case RESPONSE_CONTAINER:
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
        case GET_DOCKER_FILES:
            return Object.assign({}, state, {
                dockerFiles: action.data
            });
        case REQUEST_BUILD_IMAGE:
            return Object.assign({}, state, {
                buildImage: {
                    isRequest: true
                }
            });
        case RESPONSE_BUILD_IMAGE:
            return Object.assign({}, state, {
                buildImage: {
                    isRequest: false
                }
            });
        default:
            return state;
    }
}
