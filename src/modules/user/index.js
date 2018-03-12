import { handleActions } from 'redux-actions';

import {
    requestStart,
    requestSuccess,
    requestEnd,
    requestFailure
} from '../common/actions';
import api from '../../services/api';

import {
    loginAction,
    logoutAction
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
                localStorage.setItem('authToken', token);
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

export const reducer = handleActions({
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