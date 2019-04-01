import {CHNAGE_THEME} from '../actions/themes';

const initialState = {
    stateThemeName: 'dark',
    getTheme() {
        const theme = this.themes.find(theme => theme.name === this.stateThemeName);
        if (!theme) {
            throw new Error('Not found theme');
        }
        return theme;
    },
    themes: [{
        name: 'light',
        baseColor: '#fff',
        aniBaseColor: '#000000',
        secondBaseColor: '#ffffff',
        contentColor: '#f1f1f1',
        css: function () {
            return `
                .ant-menu-submenu > .ant-menu {
                    background: ${this.baseColor};
                }
                .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                    background-color: ${this.secondBaseColor};
                }
                .ant-layout-sider {
                    background-color: ${this.secondBaseColor}
                }
                .ant-layout {
                    background-color: ${this.contentColor};
                }
                .ant-notification-notice {
                    background-color: ${this.secondBaseColor};
                    color: ${this.aniBaseColor}b5;
                }
                .ant-notification-notice-message {
                    color: ${this.aniBaseColor}b5;
                }
                .ant-notification-notice-close {
                    color: ${this.aniBaseColor}b5;
                }
                .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
                    color: ${this.aniBaseColor};
                }
                .ant-table-thead > tr > th {
                    background: ${this.baseColor};
                }
            `
        }
    }, {
        name: 'dark',
        baseColor: '#000000',
        aniBaseColor: '#ffffff',
        secondBaseColor: '#2c2c2c',
        contentColor: '#565656',
        css: function () {
            return `
            .header {
                background: ${this.baseColor};
            }
            .header-profile {
                color: ${this.aniBaseColor};
            }
            .ant-menu {
                background: ${this.baseColor};
            }
            .ant-menu-submenu-title {
                color: ${this.aniBaseColor};
            }
            .ant-menu-submenu > .ant-menu {
                background: ${this.baseColor};
            }
            .ant-menu-item {
                color: ${this.aniBaseColor};
            }
            .ant-menu-item > a {
                color: ${this.aniBaseColor};
            }
            .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                background-color: ${this.secondBaseColor};
            }
            .ant-popover-inner {
                background-color: ${this.baseColor};
            }
            .ant-popover-title {
                 color: ${this.aniBaseColor};
            }
            .ant-layout-sider {
                background-color: ${this.secondBaseColor};
            }
            .ant-layout {
                background-color: ${this.contentColor};
            }
            .ant-notification-notice {
                background-color: ${this.secondBaseColor};
                color: ${this.aniBaseColor}b5;
            }
            .ant-notification-notice-message {
                color: ${this.aniBaseColor}b5;
            }
            .ant-notification-notice-close {
                color: ${this.aniBaseColor}b5;
            }
            .ant-breadcrumb-link {
                color: ${this.aniBaseColor}b5;
            }
            .login {
                background: ${this.baseColor};
            }
            .ant-form-item-control {
                color: ${this.aniBaseColor};
            }
            .mat-card {
                background: ${this.secondBaseColor};
            }
            .ant-table-thead > tr > th, .ant-table-tbody > tr > td {
                color: ${this.aniBaseColor};
            }
            .ant-table-thead > tr > th {
                background: ${this.baseColor};
            }
            `
        }
    }, {
        name: 'blue',
        baseColor: '#5694d2',
        aniBaseColor: '#ffffff',
        secondBaseColor: '#3e537c',
        contentColor: '#a8a8a8',
        css: function () {
            return `
            .header {
                background: ${this.baseColor};
            }
            .header-profile {
                color: ${this.aniBaseColor};
            }
            .ant-menu {
                background: ${this.baseColor};
            }
            .ant-menu-submenu-title {
                color: ${this.aniBaseColor};
            }
            .ant-menu-submenu > .ant-menu {
                background: ${this.baseColor};
            }
            .ant-menu-item {
                color: ${this.aniBaseColor};
            }
            .ant-menu-item > a {
                color: ${this.aniBaseColor};
            }
            .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
                background-color: ${this.secondBaseColor};
            }
            .ant-popover-inner {
                background-color: ${this.baseColor};
            }
            .ant-popover-title {
                 color: ${this.aniBaseColor};
            }
            .ant-layout-sider {
                background-color: ${this.secondBaseColor};
            }
            .ant-layout {
                background-color: ${this.contentColor};
            }
            `
        }
    }]
};

export default function themes(state = initialState, action) {
    switch (action.type) {
        case CHNAGE_THEME:
            const themeName = action.name;
            if (!state.themes.find(theme => theme.name === themeName)) {
                throw new Error(`Not found theme: ${themeName}`);
            }
            return Object.assign({}, state, {
                stateThemeName: action.name
            });
        default:
            return state;
    }
}
