import { createAction } from 'redux-actions';

const GET_TIME_ENTRIES_START = 'GET_TIME_ENTRIES_START';
const GET_TIME_ENTRIES_FAILURE = 'GET_TIME_ENTRIES_FAILURE';
const GET_TIME_ENTRIES_SUCCESS = 'GET_TIME_ENTRIES_SUCCESS';

export const getTimeEntriesStart = createAction(GET_TIME_ENTRIES_START);
export const getTimeEntriesSuccess = createAction(GET_TIME_ENTRIES_SUCCESS, (payload) => payload);
export const getTimeEntriesFailure = createAction(GET_TIME_ENTRIES_FAILURE, (error) => error);
