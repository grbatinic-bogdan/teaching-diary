import { handleActions } from 'redux-actions';

import api from '../../services/api';

import {
    resetAddTimeEntry,
    saveTimeEntryStart,
    saveTimeEntrySuccess,
    saveTimeEntryFailure,
} from './actions';

export const validateTimeEntry = (values) => {
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

export const createTimeEntryPayload = (values) => {
    const minutesSelected = values.timeFormat === 'minutes';

    const durationSeconds = (minutesSelected) ? values.duration * 60 : values.duration * 60 * 60;

    const payload = {
        ...values,
        duration: durationSeconds
    };

    const { location: locationJSON } = values;
    if (locationJSON !== '') {
        payload.location = JSON.parse(locationJSON);
    }

    return payload;
}

/**
 * REDUCERS
 */

const addTimeEntryInitState = {
    request: false,
    savedTimeEntry: false,
};

export const addTimeEntryReducer = handleActions({
    [saveTimeEntryStart](state) {
        return {
            ...state,
            request: true
        }
    },
    [saveTimeEntrySuccess](state) {
        return {
            ...state,
            request: false,
            savedTimeEntry: true
        }
    },
    [saveTimeEntryFailure](state) {
        return {
            ...state,
            request: false,
            savedTimeEntry: false,
        }
    },
    [resetAddTimeEntry](state) {
        return {
            ...state,
            savedTimeEntry: false
        };
    }
}, addTimeEntryInitState);

/**
 * THUNKS
 */
export const saveNewTimeEntry = (body) => {
    return (dispatch) => {
        dispatch(saveTimeEntryStart());
        api(
            'time-entry',
            'POST',
            body
        )
        .then((response) => {
            dispatch(saveTimeEntrySuccess());
        })
        .catch((error) => {
            dispatch(saveTimeEntryFailure());
        })
    }
}
