import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSystem} from '../../actions/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Dashboard extends React.Component {
    componentWillMount() {
        this.props.getDashboard();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    getIcon(platform) {
       return  platform === 'linux'
            ?<FontAwesomeIcon className={'osIcon'} icon={['fab', 'linux']} />
            :<FontAwesomeIcon className={'osIcon'} icon={['fab', 'windows']} />
    }

    render() {
        const {platform, release, homedir, upTime} = this.props.store;
        return (
            <div className={'dashboard'}>
                <div className={'dashboard-left'}>
                    {this.getIcon(platform)}
                </div>
                <div className={'dashboard-right'}>
                    <h3>Operation system: {platform}</h3>
                    <h3>Release: {release}</h3>
                    <h3>Home dir: {homedir}</h3>
                    <h3>Up time: {upTime}</h3>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        store: state.state.system
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getDashboard: () => dispatch(getSystem())
    })
};
//export default Dashboard;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
