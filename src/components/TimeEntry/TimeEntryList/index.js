import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTimeEntries } from '../../../modules/time-entry/index';
import List from './List';

class TimeEntryList extends Component {

    componentDidMount() {
        this.props.getTimeEntries();
    }

    render() {
        const {
            timeEntries
        } = this.props;

        if (timeEntries === null) {
            return (
                <div>
                    <h1>Loading time entries...</h1>
                </div>
            )
        }

        return (
            <div>
                <h3>Your previous time entries:</h3>
                <List timeEntries={timeEntries} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        timeEntries: state.timeEntries
    };
}

export default connect(mapStateToProps, { getTimeEntries })(TimeEntryList);
