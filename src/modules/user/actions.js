import { createActions, createAction } from 'redux-actions';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const loginAction = createAction(LOGIN, payload => payload);
export const logoutAction = createAction(LOGOUT, payload => payload);
