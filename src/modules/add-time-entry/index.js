import { handleActions, combineActions } from 'redux-actions';

import api from '../../services/api';
import { requestStart, requestSuccess, requestFailure } from '../common/actions';
import { resetAddTimeEntry, saveTimeEntryStart, saveTimeEntrySuccess, saveTimeEntryFailure } from './actions';

const initState = {
    request: false,
    savedTimeEntry: true,
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
}, initState);


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

/*
export const addTimeEntryReducer = (state = { request: false, savedTimeEntry: false }, action) => {
    return state
}
*/