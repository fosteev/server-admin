import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectLanguages} from '../../connectLanguages';
import {
    Menu
} from 'antd';
import {changeTheme} from '../../actions/themes';

const {SubMenu} = Menu;
const keyThemeLocalStorage = 'theme';


class ThemesMenu extends React.Component {
    componentWillMount() {
        this.setThemeFromLocalStorage();
    }

    changeTheme(nameTheme) {
        localStorage.setItem(keyThemeLocalStorage, nameTheme);
        this.setThemeFromLocalStorage();
    }

    setThemeFromLocalStorage() {
        const name = localStorage.getItem(keyThemeLocalStorage);
        if (name) {
            this.props.onChangeTheme(name);
        }
    }

    getThemes() {
        const {t, themes} = this.props;
        return themes.map(theme =>
            <Menu.Item className={'languages-select-item'} key={theme.name}>
                <span>{t(theme.name)}</span>
            </Menu.Item>)
    }

    render() {
        const {t, theme} = this.props;
        return (
            <Menu mode="inline"
                  defaultSelectedKeys={[theme.name]}
                  onClick={(item) => this.changeTheme(item.key)}>

                <SubMenu key="sub2" title={ <span>{t('Themes')}</span>}>
                    {this.getThemes()}
                </SubMenu>

            </Menu>
        )
    }
}

const mapStateToProps = state => {
    const theme = state.themes.getTheme();
    return {
        theme: theme,
        themes: state.themes.themes
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTheme: name => dispatch(changeTheme(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(ThemesMenu));
