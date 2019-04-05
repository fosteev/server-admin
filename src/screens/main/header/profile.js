import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectLanguages} from '../../../connectLanguages';
import {
    Avatar, Popover
} from 'antd';
import {changeTheme} from '../../../actions/themes';

import LanguagesMenu from '../../../components/languagesMenu';
import ThemesMenu from '../../../components/themesMenu';
import ExitAppButton from '../../../components/exitAppBtn';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.popover = React.createRef();
    }

    state = {
        isPopoverVisible: false
    }

    onOpenExitModal = () => {
        this.setPopoverVisible(false);
    }

    setPopoverVisible = isVisible => {
        this.setState({
            isPopoverVisible: isVisible
        })
    }

    onClickPopover = () => {
        this.setPopoverVisible(!this.state.isPopoverVisible)
    }

    render() {
        const {t, theme} = this.props;
        return (
            <div className="header-profile">
                <p>{this.props.name}</p>
                <Popover placement="bottom"
                         title={t('Profile settings')}
                         onClick={this.onClickPopover}
                         ref={this.popover}
                         visible={this.state.isPopoverVisible}
                         content={<div className={'header-languages-popover'}>
                             <LanguagesMenu />
                             <ThemesMenu />
                             <ExitAppButton onOpenModal={this.onOpenExitModal}/>
                         </div>}>
                    <Avatar className={'cursor-pointer'} size={42}
                            src={this.props.image}/>
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {name, image} = state.login;
    const {list} = state.languages;
    const theme = state.themes.getTheme();
    return {
        name: name,
        image: image,
        languagesList: list,
        theme: theme,
        themes: state.themes.themes
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTheme: name => dispatch(changeTheme(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(Profile));
