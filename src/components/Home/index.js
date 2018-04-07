import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import TimeEntryList from '../TimeEntry/TimeEntryList';
import AddTimeEntry from '../TimeEntry/AddTimeEntry';


export default (props) => {
    const {
        match
    } = props;
    return (
        <div>
            <Link to="/new-time-entry">Add new time entry</Link>
            <TimeEntryList />
        </div>
    )
}