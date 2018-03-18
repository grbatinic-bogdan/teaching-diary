import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

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

        return (
            <div>
                <ReduxedForm onSubmit={this.handleSubmit} />
                <p>Don't have an account? You can <Link to="/register">register</Link> here</p>
            </div>

        )
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