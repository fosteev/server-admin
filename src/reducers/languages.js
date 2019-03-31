import {NOTIFICATION, CLOSE_NOTIFICATION, OPEN_NOTIFICATION} from '../actions/state';

const initialState = {
    list: [{
        name: 'Russian',
        index: 'ru'
    }, {
        name: 'English',
        index: 'en'
    }, {
        name: 'French',
        index: 'fr'
    }, {
        name: 'German',
        index: 'german'
    }, {
        name: 'Portugal',
        index: 'pt'
    }]
};

export default function login(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
