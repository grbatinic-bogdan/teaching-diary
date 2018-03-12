import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import LoginForm from './LoginForm';
import { login } from '../../modules/user';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.onSubmit.bind(this);
    }

    render() {
        const ReduxedForm = reduxForm({
            form: 'login'
        })(LoginForm);

        return <ReduxedForm onSubmit={this.handleSubmit} />
    }

    onSubmit(values) {
        const {
            email,
            password
        } = values;
        this.props.login(email, password);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { login })(LoginPage);