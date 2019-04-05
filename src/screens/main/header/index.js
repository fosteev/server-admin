import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectLanguages} from '../../../connectLanguages';
import {
    Layout
} from 'antd';
const {Header} = Layout;
import Profile from './profile';


class HeaderApp extends React.Component {
    render() {
        const {t, theme} = this.props;

        const styles = {
            header: {
                backgroundColor: theme.headerBackground
            }
        };

        return (
            <Header className="header" style={styles.header}>
                <Profile />
            </Header>
        )
    }
}

const mapStateToProps = state => {
    const theme = state.themes.getTheme();
    return {
        theme: theme
    }

}

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(HeaderApp));
