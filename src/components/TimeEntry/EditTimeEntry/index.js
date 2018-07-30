import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTimeEntryById } from '../../../modules/edit-time-entry';

class EditTimeEntry extends Component {

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
            return <h1>This is time entry {timeEntry.name}</h1>
        }

        return <h1>Loading time entry, please wait</h1>
    }
}

const mapStateToProps = (state) => {
    const {
        editTimeEntry: {
            timeEntry,
            getRequest,
            saveRequest
        }
    } = state;

    return {
        timeEntry,
        getRequest,
        saveRequest
    };
}

export default connect(mapStateToProps, { getTimeEntryById })(EditTimeEntry);