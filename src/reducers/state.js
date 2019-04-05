import {
    NOTIFICATION,
    CLOSE_NOTIFICATION,
    OPEN_NOTIFICATION,
    CHANGE_FORM_STATE
} from '../actions/state';

import {
    FAIL_LOGIN
} from "../actions/login";

const initialState = {
    notifications: [],
    form: {
        name: '',
        visible: false
    },
    failText: ''
};

export default function state(state = initialState, action) {
    switch (action.type) {
        case NOTIFICATION:
            const msg = {
                index: action.index,
                close: false,
                title: action.title,
                text: action.text,
                isOpen: false
            }
            return Object.assign({}, state, {
                notifications: state.notifications.concat([msg])
            });
        case CLOSE_NOTIFICATION: {
            return Object.assign({}, state, {
                notifications: state.notifications.map(notification => {
                    if (notification.index === action.index) {
                        notification.close = true;
                        notification.isOpen = false;
                    }
                    return notification;
                })
            })
        }
        case OPEN_NOTIFICATION: {
            return Object.assign({}, state, {
                notifications: state.notifications.map(notification => {
                    if (notification.index === action.index) {
                        notification.isOpen = true;
                    }
                    return notification;
                })
            })
        }
        case CHANGE_FORM_STATE: {
            return Object.assign({}, state, {
                form: {
                    name: action.name,
                    visible: action.visible
                }
            })
        }
        case FAIL_LOGIN: {
            return Object.assign({}, state, {
                failText: action.text
            })
        }
        default:
            return state;
    }
}
