import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

import { Link } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <NavbarBrand>Teaching Diary</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Link to="/logout">Logout</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}