import { handleActions } from 'redux-actions';

import { normalizeTimeEntries } from './normalizr';
import { getTimeEntriesStart, getTimeEntriesSuccess, getTimeEntriesFailure } from './actions';
import api from '../../services/api';

export const getTimeEntries = () => {
    return dispatch => {
        dispatch(getTimeEntriesStart());
        api(
            'time-entry',
            'GET'
        )
        .then((response) => {
            const { data } = response;

            dispatch(getTimeEntriesSuccess(data));
        })
        .catch((error) => {
            dispatch(getTimeEntriesFailure(error));
        })
    }
};

export const timeEntriesReducer = handleActions({
    [getTimeEntriesSuccess](state, { payload } ) {
        return normalizeTimeEntries(payload);
    }
}, null);

