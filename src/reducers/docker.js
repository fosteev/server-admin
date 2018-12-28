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
                images: action.images.map(image => {
                    image['name'] = image.RepoTags[0];
                    image['date'] = new Date(image.Created * 1000);
                    image['megabyte'] = (image.Size / 1000 / 1000).toFixed(0);
                    image['id'] = image.Id.split(':')[1].slice(0, 6);
                    return image;
                })
            });
        default:
            return state;
    }
}
