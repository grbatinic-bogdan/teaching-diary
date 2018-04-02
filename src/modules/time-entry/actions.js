import { createAction } from 'redux-actions';

const GET_TIME_ENTRIES = 'GET_TIME_ENTRIES';

export const getTimeEntriesAction = createAction(GET_TIME_ENTRIES, (payload) => payload);