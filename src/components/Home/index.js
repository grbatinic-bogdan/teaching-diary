import React from 'react';
import { Link } from 'react-router-dom';

import TimeEntryList from '../TimeEntry/TimeEntryList';

export default (props) => {
    return (
        <div>
            <Link to="/new-time-entry">Add new time entry</Link>
            <TimeEntryList />
        </div>
    )
}