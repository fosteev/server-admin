import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectLanguages} from '../../connectLanguages';
import {
    Menu
} from 'antd';

const {SubMenu} = Menu;
const keyLangLocalStorage = 'language';

class LanguagesMenu extends React.Component {
    state = {
        defaultLanguage: 'en'
    }

    componentWillMount() {
        this.setLanguageFromLocalStorage();
    }

    setLanguageFromLocalStorage() {
        const langLocalStorage = localStorage.getItem(keyLangLocalStorage);
        if (langLocalStorage) {
            this.setState({
                defaultLanguage: langLocalStorage
            });
            this.props.i18n.changeLanguage(langLocalStorage);
        }
    }


    changeLanguage(index) {
        localStorage.setItem(keyLangLocalStorage, index);
        this.setLanguageFromLocalStorage();
    }


    getLanguages() {
        const {t, languagesList} = this.props;
        return languagesList.map(lang =>
            <Menu.Item  className={'languages-select-item'} key={lang.index}>
                <span>{t(lang.name)}</span>
            </Menu.Item>)
    }

    render() {
        const {t} = this.props;
        return (
            <Menu mode="inline"
                  defaultSelectedKeys={[this.state.defaultLanguage]}
                  onClick={(item) => this.changeLanguage(item.key)}>

                <SubMenu key="sub1" title={
                    <span>{t('Languages')}</span>}>
                    {this.getLanguages()}
                </SubMenu>

            </Menu>
        )
    }
}

const mapStateToProps = state => {
    const {list} = state.languages;
    return {
        languagesList: list
    }

}

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(LanguagesMenu));
