import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Button, notification } from 'antd';
import {connect} from "react-redux";
import {closeNotification, openNotification} from '../../actions/state';

const showNotification = (title, text) => {
    return new Promise(resolve => {
        notification.open({
            message: title,
            description: text,
            duration: 0,
            onClick: () => {
                //resolve('close');
            },
            onClose: () => {
                resolve('close');
            }
        });
    })
};

class Notification extends React.Component {
    componentWillReceiveProps(nextProps) {
        nextProps.notifications.forEach(notification => {
            if (!notification.close) {
                const index = notification.index;
                if (notification.isOpen) {
                    return;
                }
                showNotification(notification.title, notification.text).then(event => {
                    if (event === 'close') {
                        this.props.setCloseStateNotification(index);
                    }
                });
                this.props.setOpenStateNotification(index);
            }
        })
    }

    render() {
        return (
            <div style={{display: 'none'}}>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.state.notifications
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCloseStateNotification: index => dispatch(closeNotification(index)),
        setOpenStateNotification: index => dispatch(openNotification(index))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);

