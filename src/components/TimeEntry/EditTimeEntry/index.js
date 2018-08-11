import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';

import { getTimeEntryById, updateTimeEntry } from '../../../modules/edit-time-entry';
import TimeEntryForm from '../TimeEntryForm';
import { validateTimeEntry, createTimeEntryPayload } from '../../../modules/add-time-entry';

class EditTimeEntry extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.onSubmit.bind(this);
        this.handleValidation = validateTimeEntry.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: {
                    id
                }
            },
            getTimeEntryById
        } = this.props;

        getTimeEntryById(id);
    }

    render() {
        const {
            timeEntry,
            getRequest,
            saveRequest
        } = this.props;


        if (saveRequest && getRequest === false) {
            return <h1>Saving...</h1>
        }

        if (getRequest === false && saveRequest === false && timeEntry !== null) {
            const locationAddress = (timeEntry.location) ? timeEntry.location.address : null;
            const location = (timeEntry.location) ? JSON.stringify(timeEntry.location) : null;
            const time = moment(timeEntry.time).format('YYYY-MM-DD');
            const timeFormat = 'minutes';
            const duration = (timeFormat === 'minutes') ? timeEntry.duration / 60 : timeEntry.duration / 60 / 60;
            const initialValues = {
                ...timeEntry,
                location,
                locationAddress,
                timeFormat,
                time,
                duration
            };
            const Form = reduxForm({
                form: 'editTimeEntry',
                initialValues,
                validate: this.handleValidation
            })(TimeEntryForm);
            const timeMaxDate = moment().format('YYYY-MM-DD');

            return (
                <Form onSubmit={this.handleSubmit} timeMaxDate={timeMaxDate} />
            );
        }

        return <h1>Loading time entry, please wait</h1>
    }

    onSubmit(values) {
        const {
            match: {
                params: {
                    id
                }
            },
            updateTimeEntry
        } = this.props;
        const payload = createTimeEntryPayload(values);
        updateTimeEntry(id, payload);
    }
}

const mapStateToProps = (state) => {
    const {
        editTimeEntry: {
            timeEntry,
            getRequest,
            saveRequest,
        }
    } = state;

    return {
        timeEntry,
        getRequest,
        saveRequest,
    };
}

export default connect(mapStateToProps, { getTimeEntryById, updateTimeEntry })(EditTimeEntry);