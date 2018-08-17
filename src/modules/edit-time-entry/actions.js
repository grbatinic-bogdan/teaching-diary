import { createAction } from 'redux-actions';

const GET_TIME_ENTRY_START = 'GET_TIME_ENTRY_START';
const GET_TIME_ENTRY_SUCCESS = 'GET_TIME_ENTRY_SUCCESS';
const GET_TIME_ENTRY_FAILURE = 'GET_TIME_ENTRY_FAILURE';

const UPDATE_TIME_ENTRY_START = 'UPDATE_TIME_ENTRY_START';
const UPDATE_TIME_ENTRY_SUCCESS = 'UPDATE_TIME_ENTRY_SUCCESS';
const UPDATE_TIME_ENTRY_FAILURE = 'UPDATE_TIME_ENTRY_FAILURE';

const TOGGLE_DELETE_TIME_ENTRY = 'TOGGLE_DELETE_TIME_ENTRY'
const DELETE_TIME_ENTRY_START = 'DELETE_TIME_ENTRY_START';
const DELETE_TIME_ENTRY_SUCCESS = 'DELETE_TIME_ENTRY_SUCCESS';
const DELETE_TIME_ENTRY_FAILURE = 'DELETE_TIME_ENTRY_FAILURE';

export const getTimeEntryStart = createAction(GET_TIME_ENTRY_START);
export const getTimeEntrySuccess = createAction(GET_TIME_ENTRY_SUCCESS, (payload) => payload);
export const getTimeEntryFailure = createAction(GET_TIME_ENTRY_FAILURE, (error) => error);

export const updateTimeEntryStart = createAction(UPDATE_TIME_ENTRY_START);
export const updateTimeEntrySuccess = createAction(UPDATE_TIME_ENTRY_SUCCESS, (payload) => payload);
export const updateTimeEntryFailure = createAction(UPDATE_TIME_ENTRY_FAILURE, (error) => error);

export const toggleDeleteTimeEntry = createAction(TOGGLE_DELETE_TIME_ENTRY);
export const deleteTimeEntryStart = createAction(DELETE_TIME_ENTRY_START);
export const deleteTimeEntrySuccess = createAction(DELETE_TIME_ENTRY_SUCCESS);
export const deleteTimeEntryFailure = createAction(DELETE_TIME_ENTRY_FAILURE, (error) => error);


