import { createActions } from 'redux-actions'

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'REQUEST_FAILURE';
export const REQUEST_END = 'REQUEST_END';

export const {
    requestStart,
    requestSuccess,
    requestFailure,
    requestEnd
} = createActions(REQUEST_START, REQUEST_SUCCESS, REQUEST_FAILURE, REQUEST_END);