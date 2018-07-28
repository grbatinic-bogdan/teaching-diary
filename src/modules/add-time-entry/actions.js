import { createAction } from 'redux-actions';

const SAVE_TIME_ENTRY = 'SAVE_TIME_ENTRY';
const SAVE_TIME_ENTRY_START = 'SAVE_TIME_ENTRY_START';
const SAVE_TIME_ENTRY_SUCCESS = 'SAVE_TIME_ENTRY_SUCCESS';
const SAVE_TIME_ENTRY_FAILURE = 'SAVE_TIME_ENTRY_FAILURE';
const SAVE_TIME_ENTRY_END = 'SAVE_TIME_ENTRY_END';
const RESET_ADD_TIME_ENTRY = 'RESET_ADD_TIME_ENTRY';

export const saveTimeEntry = createAction(SAVE_TIME_ENTRY, (payload) => payload);
export const saveTimeEntryStart = createAction(SAVE_TIME_ENTRY_START);
export const saveTimeEntrySuccess = createAction(SAVE_TIME_ENTRY_SUCCESS);
export const saveTimeEntryFailure = createAction(SAVE_TIME_ENTRY_FAILURE);
export const saveTimeEntryEnd = createAction(SAVE_TIME_ENTRY_END);
export const resetAddTimeEntry = createAction(RESET_ADD_TIME_ENTRY);
