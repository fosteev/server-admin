import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import {connect} from "react-redux";
import {reqContainers} from '../../../actions/docker';


class Containers extends React.Component {
    componentDidMount() {
        console.log('willmount');
        this.props.getContainers();
    }

    render() {
        return (<div>Accounts</div>);
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.accounts
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getContainers: (params) => dispatch(reqContainers(params))
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(Containers);
