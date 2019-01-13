import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSystem, getConfiguration} from '../../actions/state';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class Dashboard extends React.Component {
    componentWillMount() {
        this.props.getDashboard();
        this.props.getConfig();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    getIcon(platform) {
        return platform === 'linux'
            ? <FontAwesomeIcon className={'osIcon'} icon={['fab', 'linux']}/>
            : <FontAwesomeIcon className={'osIcon'} icon={['fab', 'windows']}/>
    }

    getHeaders() {
        let headers = [];
        const confHeaders = this.props.config.headers;
        for (const key in confHeaders) {
            const value = confHeaders[key];
            headers.push()
        }
    }

    render() {
        const {platform, release, homedir, upTime} = this.props.system;
        const {headers, port, path} = this.props.config;
        return (
            <div className={'dashboard'}>
                <div className="dashboard-os">
                    <div className="mat-card">
                        <h1>OS Dashboard</h1>
                        {this.getIcon(platform)}
                        <h3>Operation system: {platform ? platform[0].toUpperCase() + platform.slice(1) : platform}</h3>
                        <h3>Release: {release}</h3>
                        <h3>Home dir: {homedir}</h3>
                        <h3>Up time: {upTime}</h3>
                    </div>
                </div>
                <div className="dashboard-config">
                    <div className="mat-card">
                        <h1>OS Dashboard</h1>
                        {this.getIcon(platform)}
                        <h3>Operation system: {platform ? platform[0].toUpperCase() + platform.slice(1) : platform}</h3>
                        <h3>Release: {release}</h3>
                        <h3>Home dir: {homedir}</h3>
                        <h3>Up time: {upTime}</h3>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        system: state.state.system,
        config: state.state.config
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getDashboard: () => dispatch(getSystem()),
        getConfig: () => dispatch(getConfiguration())
    })
};
//export default Dashboard;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
