import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../modules/user'

class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <h1>Logging you out</h1>
        )
    }
}

export default connect(null, { logout })(Logout);