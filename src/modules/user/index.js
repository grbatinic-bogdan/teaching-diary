import { handleActions } from 'redux-actions';
import { reset } from 'redux-form';
import { combineReducers } from 'redux';

import {
    requestStart,
    requestSuccess,
    requestEnd,
    requestFailure
} from '../common/actions';
import api from '../../services/api';

import {
    loginAction,
    logoutAction,
    registerAction
} from './actions';

export const login = (email, password) => {
    return (dispatch) => {
        dispatch(requestStart());

        api(
            'login',
            'POST', {
                email,
                password
            },
            false
        )
        .then((response) => {
            const {
                data,
                request
            } = response;

            const token = request.headers.get('x-auth');
            if (token) {
                const userData = {
                    ...data,
                    token
                }
                localStorage.setItem('userData', JSON.stringify(userData));

                dispatch(loginAction(data));
                dispatch(requestSuccess());
            }
        })
        .catch((error) => {
            console.log(error);
            dispatch(requestFailure());
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem('userData');
        dispatch(logoutAction());
    }
}

export const register = (payload) => {
    return (dispatch) => {
        dispatch(requestStart());

        api(
            'users',
            'POST',
            payload,
            false
        )
        .then((response) => {
            dispatch(requestSuccess());
            const {
                data
            } = response;
            return data;
        })
        .then((data) => {
            dispatch(registerAction(data));
            dispatch(reset('register'));
        })
        .catch((error) => {
            dispatch(requestFailure());
        })
    }
}

const registerReducer = handleActions({
    [registerAction](state, payload) {
        return {
            hasRegistered: true
        };
    },
}, {
    hasRegistered: false
});

export const userReducer = handleActions({
    [loginAction](state, {payload: { email, firstName, lastName } }) {
        return {
            email,
            firstName,
            lastName
        }
    },
    [logoutAction]() {
        return null
    }
}, null);

export const reducer = combineReducers({
    data: userReducer,
    register: registerReducer
})