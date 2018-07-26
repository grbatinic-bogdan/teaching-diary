import { handleActions, combineActions } from 'redux-actions';

import api from '../../services/api';
import { requestStart, requestSuccess, requestFailure } from '../common/actions';
import { resetAddTimeEntry } from './actions';

const initState = {
    request: false,
    savedTimeEntry: false,
};


export const addTimeEntryReducer = handleActions({
    [requestStart](state) {
        return {
            ...state,
            request: true
        }
    },
    [requestSuccess](state) {
        return {
            ...state,
            request: false,
            savedTimeEntry: true
        }
    },
    [requestFailure](state) {
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
        dispatch(requestStart());
        api(
            'time-entry',
            'POST',
            body
        )
        .then((response) => {
            dispatch(requestSuccess());
        })
        .catch((error) => {
            dispatch(requestFailure());
        })
    }
}

/*
export const addTimeEntryReducer = (state = { request: false, savedTimeEntry: false }, action) => {
    return state
}
*/