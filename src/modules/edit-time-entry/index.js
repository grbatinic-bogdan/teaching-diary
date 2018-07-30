import { handleActions, combineActions } from 'redux-actions';

import api from '../../services/api';
import {
    getTimeEntryStart,
    getTimeEntrySuccess,
    getTimeEntryFailure
} from './actions';

const editTimeEntryInitState = {
    getRequest: false,
    saveRequest: false,
    timeEntry: null
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
            const { data } = payload
            dispatch(getTimeEntrySuccess(data));
        })
        .catch((error) => {
            dispatch(getTimeEntryFailure(error))
        })
        ;
    }
}