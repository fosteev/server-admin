import React, {Component} from 'react';
import {connect} from "react-redux";
import {connectLanguages} from '../../connectLanguages';
import {
    Button, Modal
} from 'antd';
import {loginOut} from '../../actions/login';

const style = {
    border: 'none'
};

class ExitAppButton extends React.Component {
    state = {
        isModalVisible: false,
        loading: false
    }

    onClick = () => {
        this.setState({
            isModalVisible: true
        })
        this.props.onOpenModal();
    }

    onCancel = () => {
        this.setState({
            isModalVisible: false
        })
    }

    onOk = () => {
        this.setState({
            loading: true
        })
        this.props.onLoginOut();
    }

    render() {
        const {t} = this.props;
        return (
           <div>
               <Button style={style}
                       block
                       onClick={this.onClick}
               >{t('Exit')}</Button>
               <Modal
                   title={t('Confirm')}
                   visible={this.state.isModalVisible}
                   centered={true}
                   //onOk={this.handleOk}
                   onCancel={this.onCancel}
                   footer={[
                       <Button key="back" onClick={this.onCancel}>{t('Cancel')}</Button>,
                       <Button key="submit" type="primary" loading={this.state.loading} onClick={this.onOk}>
                           {t('Exit')}
                       </Button>,
                   ]}
               >
                   <p>{t('Are you sure want exit?')}</p>
               </Modal>
           </div>
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
        onLoginOut: () => dispatch(loginOut())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(connectLanguages(ExitAppButton));
