import { handleActions } from 'redux-actions';

import { getTimeEntriesAction } from './actions';
import { normalizeTimeEntries } from './normalizr';
import { requestStart, requestFailure, requestEnd, requestSuccess } from '../common/actions';
import api from '../../services/api';

export const getTimeEntries = () => {
    return dispatch => {
        dispatch(requestStart());
        api(
            'time-entry',
            'GET'
        )
        .then((response) => {
            const { data } = response;

            dispatch(getTimeEntriesAction(data));
            dispatch(requestSuccess());
        })
        .catch((error) => {
            dispatch(requestFailure());
        })
    }
};

export const timeEntriesReducer = handleActions({
    [getTimeEntriesAction](state, { payload } ) {
        return normalizeTimeEntries(payload);
    }
}, null);

