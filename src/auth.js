import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';

const locationHelper = locationHelperBuilder({})

const userIsAuthenticatedDefaults = {
    authenticatedSelector: state => state.user !== null,
    wrapperDisplayName: 'UserIsAuthenticated'
}

export const userIsAuthenticatedRedir = connectedRouterRedirect({
    ...userIsAuthenticatedDefaults,
    redirectPath: '/login'
});

export const userIsNotAuthenticated = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => state.user === null,
    wrapperDisplayName: 'UserIsNotAuthenticated'
})