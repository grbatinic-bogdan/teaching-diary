import { createActions, createAction } from 'redux-actions';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';

export const loginAction = createAction(LOGIN, payload => payload);
export const logoutAction = createAction(LOGOUT, payload => payload);

export const registerAction = createAction(REGISTER, payload => payload);
