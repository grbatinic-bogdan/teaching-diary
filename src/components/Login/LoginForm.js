import React from 'react';

import { Field, Form } from 'redux-form';
import { Button, FormGroup, Label, Input, FormText } from 'reactstrap';
//import {  } from 'redux-form';

const renderField = (props) => {
    const {
        input,
        meta: {
            touched,
            error,
            warning
        },
        ...custom
    } = props;

    return <Input {...input}  {...custom} />
}

export default class LoginForm extends React.Component {
    render() {
        const {
            handleSubmit
        } = this.props;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Field name="email" component={renderField} type="email" placeholder="someone@email.com" />
                    </FormGroup>
                    <FormGroup>
                        <Field name="password" component={renderField} type="password" placeholder="mysecretpassword" />
                    </FormGroup>
                    <FormGroup>
                        <Button>Login</Button>
                    </FormGroup>
                </form>
            </div>
        )
    }
}