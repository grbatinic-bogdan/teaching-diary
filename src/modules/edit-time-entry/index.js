import { handleActions } from 'redux-actions';

import api from '../../services/api';
import {
    getTimeEntryStart,
    getTimeEntrySuccess,
    getTimeEntryFailure,
    updateTimeEntryStart,
    updateTimeEntrySuccess,
    updateTimeEntryFailure,
    toggleDeleteTimeEntry,
    deleteTimeEntryStart,
    deleteTimeEntrySuccess,
    deleteTimeEntryFailure,
} from './actions';

import {
    getTimeEntriesStart
} from '../time-entry/actions';

const editTimeEntryInitState = {
    getRequest: false,
    saveRequest: false,
    timeEntry: null,
    isDelete: false,
    deleted: false
};

export const editTimeEntryReducer = handleActions({
    [getTimeEntryStart](state) {
        return {
            ...state,
            getRequest: true
        }
    },
    [getTimeEntrySuccess](state, { payload }) {
        return {
            ...state,
            getRequest: false,
            timeEntry: payload
        }
    },
    [updateTimeEntryStart](state) {
        return {
            ...state,
            saveRequest: true
        }
    },
    [updateTimeEntrySuccess] (state, { payload }) {
        return {
            ...state,
            saveRequest: false,
            timeEntry: payload
        }
    },
    [updateTimeEntryFailure] (state) {
        return {
            ...state,
            saveRequest: false
        }
    },
    [toggleDeleteTimeEntry] (state) {
        return {
            ...state,
            isDelete: !state.isDelete
        }
    },
    [deleteTimeEntryStart] (state) {
        return {
            ...state,
            isDelete: false
        }
    },
    [deleteTimeEntrySuccess] (state) {
        return {
            ...state,
            deleted: true,
            isDelete: false
        }
    },
    [deleteTimeEntryFailure] (state) {
        return {
            ...state,
            deleted: false,
            isDelete: false
        }
    },
    [getTimeEntriesStart] (state) {
        return {
            ...state,
            deleted: false,
            isDelete: false
        }
    }
}, editTimeEntryInitState);

export const getTimeEntryById = (id) => {
    return (dispatch) => {
        dispatch(getTimeEntryStart());

        api(
            `time-entry/${id}`,
            'GET',
        )
        .then((payload) => {
            const { data } = payload;
            dispatch(getTimeEntrySuccess(data));
        })
        .catch((error) => {
            dispatch(getTimeEntryFailure(error))
        })
        ;
    }
}

export const updateTimeEntry = (id, body) => {
    return (dispatch) => {
        dispatch(updateTimeEntryStart());

        api(
            `time-entry/${id}`,
            'PUT',
            body
        )
        .then((payload) => {
            const { data } = payload;
            dispatch(updateTimeEntrySuccess(data));
        })
        .catch((error) => {
            // handle the error
            dispatch(updateTimeEntryFailure('Unable to save time entry'));
        })
    }
}

export const deleteTimeEntry = (id) => {
    return (dispatch) => {
        dispatch(deleteTimeEntryStart());

        api(
            `time-entry/${id}`,
            'DELETE'
        )
        .then(() => {
            dispatch(deleteTimeEntrySuccess());
        })
        .catch((error) => {
            dispatch(deleteTimeEntryFailure('Failed to remove time entry'));
        })
    }
}