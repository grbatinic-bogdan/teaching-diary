import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { logout } from '../../modules/user';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.logout.bind(this);
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand>Teaching Diary</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#" onClick={this.onLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }

    logout(event) {
        event.preventDefault();
        const {
            logout
        } = this.props;

        logout();
    }
}

export default connect(null, { logout })(Navigation);