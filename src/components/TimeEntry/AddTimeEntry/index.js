import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import TimeEntryForm from '../TimeEntryForm';

class AddTimeEntry extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.onSubmit.bind(this);
    }

    render() {
        const Form = reduxForm({
            form: 'addTimeEntry'
        })(TimeEntryForm);

        return (
            <div>
                <Form onSubmit={this.handleSubmit} />
            </div>
        );
    }

    onSubmit() {

    }
}

export default AddTimeEntry;