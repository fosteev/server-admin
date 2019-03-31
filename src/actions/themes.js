export const CHNAGE_THEME = 'CHNAGE_THEME';

export function changeTheme(name) {
    return {
        type: CHNAGE_THEME,
        name: name
    }
}