import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import moment from 'moment';

import TimeEntryForm from '../TimeEntryForm';
import { saveNewTimeEntry } from '../../../modules/add-time-entry/index';
import { resetAddTimeEntry } from '../../../modules/add-time-entry/actions';



class AddTimeEntry extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleValidation = this.validate.bind(this);
        this.handleHomeLinkClick = this.headHomeClick.bind(this);
    }

    render() {
        const {
            request,
            savedTimeEntry,
            resetAddTimeEntry
        } = this.props;
        if (request) {
            return (
                <h2>Saving time entry, please wait</h2>
            )
        }
        if (savedTimeEntry) {
            return (
                <div>
                    <h2>Successfully saved new time entry.</h2>
                    <p>
                        <a href="javascript:void(0)" onClick={resetAddTimeEntry}>Add new</a>
                    </p>
                    <p>
                        <Link to="/" onClick={this.handleHomeLinkClick}>Head back home</Link>
                    </p>
                </div>
            )
        }
        const Form = reduxForm({
            form: 'addTimeEntry',
            initialValues: {
                timeformat: 'minutes'
            },
            validate: this.handleValidation
        })(TimeEntryForm);

        const timeMaxDate = moment().format('YYYY-MM-DD');
        return (
            <div>
                <Form onSubmit={this.handleSubmit} timeMaxDate={timeMaxDate} />
            </div>
        );
    }

    headHomeClick() {
        this.props.resetAddTimeEntry();
    }

    onSubmit(values) {
        const minutesSelected = values.timeFormat === 'minutes';
        //const { duration: rawDuration } = parseFloat;

        const durationSeconds = (minutesSelected) ? values.duration * 60 : values.duration * 60 * 60;

        const payload = {
            ...values,
            duration: durationSeconds
        };

        const { location: locationJSON } = values;
        if (locationJSON !== '') {
            payload.location = JSON.parse(locationJSON);
        }

        const { saveNewTimeEntry } = this.props;
        saveNewTimeEntry(payload);
    }

    validate(values) {
        const errors = {};
        const {
            name,
            time,
            duration
        } = values;

        if (!name) {
            errors.name = 'Name is required';
        }

        if (!time) {
            errors.time = 'Time is required';
        }

        if (!duration) {
            errors.duration = 'Duration is required';
        }

        return errors;
    }
}

const mapStateToProps = (state) => {
    const {
        addTimeEntry: {
            request,
            savedTimeEntry
        }
    } = state;

    return {
        request,
        savedTimeEntry
    };
}


export default connect(mapStateToProps, { saveNewTimeEntry, resetAddTimeEntry })(AddTimeEntry);
// export default AddTimeEntry;