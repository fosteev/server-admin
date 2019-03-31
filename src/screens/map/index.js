import React, {Component} from 'react';
import {connect} from "react-redux";
import {notification, showForm} from '../../actions/state';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Map from '../../components/leaflet';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.map = React.createRef();
    }

    state = {
        visible: false
    }

    showModal = () => {
        this.props.openForm({
            name: 'register',
            isVisible: true
        })
    }

    componentDidMount() {
        this.props.setNotification('Open map', 'You open map menu', 'map');
    }

    render() {
        return (
            <div className={'dashboard'} style={{height: '500px', width: '100%'}}>
                <Map ref={this.map}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        setNotification: (title, text, index) => dispatch(notification(title, text, index)),
        openForm: (options) => dispatch(showForm(options))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
