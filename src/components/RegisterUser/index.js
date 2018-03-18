import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import { Alert } from 'reactstrap';
import { register } from '../../modules/user';


class RegisterUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleValidation = this.validate.bind(this);
    }

    render() {
        const RegisterFormRedux = reduxForm({
            form: 'register',
            validate: this.handleValidation
        })(RegisterForm);

        const {
            hasRegistered
        } = this.props

        return (
            <div>
                <h1>Register</h1>
                {hasRegistered && <Alert color="success">You have successfully registered! You can <Link to="/login">login</Link> using your new email and password</Alert>}
                <RegisterFormRedux onSubmit={this.handleSubmit} />
            </div>
        )
    }

    onSubmit(values) {
        this.props.register(values);
    }

    validate(values) {
        const errors = {};
        const {
            password,
            repeatpassword
        } = values;

        if (password && repeatpassword) {
            if (password !== repeatpassword) {
                errors.password = 'Passwords do not match';
                errors.repeatpassword = 'Passwords do not match';
            }
        }

        return errors;
    }
}

const mapStateToProps = (state) => {
    const {
        user: {
            register: {
                hasRegistered
            }
        }
    } = state;

    return {
        hasRegistered
    }
}

export default connect(mapStateToProps, { register })(RegisterUser);