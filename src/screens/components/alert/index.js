import React, {Component} from 'react';
import { message, Button } from 'antd';

const success = () => {
    message.success('This is a message of success');
};

const error = () => {
    message.error('This is a message of error');
};

const warning = () => {
    message.warning('This is message of warning');
};

ReactDOM.render(
    <div>
        <Button onClick={success}>Success</Button>
        <Button onClick={error}>Error</Button>
        <Button onClick={warning}>Warning</Button>
    </div>,
    mountNode
);



import {connect} from "react-redux";
import { message, Button } from 'antd';

class Images extends React.Component {
    componentDidMount() {
        this.props.getContainers();
    }

    render() {
        return (
            <div></div>);
    }
}

const mapStateToProps = state => {
    return {
        docker: state.docker
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        getContainers: (params) => dispatch(reqContainers(params))
    })
};


export default connect(mapStateToProps, mapDispatchToProps)(Images);
