export const NOTIFICATION = 'NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';
export const CHANGE_FORM_STATE = 'CHANGE_FORM_STATE';

export function notification(title, text, index) {
    return {
        type: NOTIFICATION,
        index: index,
        title: title,
        text: text
    }
}

export function closeNotification(index) {
    return {
        type: CLOSE_NOTIFICATION,
        index: index
    }
}

export function openNotification(index) {
    return {
        type: OPEN_NOTIFICATION,
        index: index
    }
}

export function showForm({name, isVisible}) {
    return {
        type: CHANGE_FORM_STATE,
        name: name,
        visible: isVisible,
    }
}