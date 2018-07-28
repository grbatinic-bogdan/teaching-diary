export default (path, method, body = null, authenticate = true) => {
    const apiBaseUri = 'http://localhost:8000/';
    const appBaseUri = 'http://localhost:3000/';

    const headers = {
        'content-type': 'application/json'
    };
    const localStorageSessionKey = 'userData';
    if (authenticate) {
        const userData = JSON.parse(localStorage.getItem(localStorageSessionKey));
        if (!userData) {
            throw new Error('User data not set');
        }
        const token = userData.token;
        //const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Token not found in storage');
        }

        headers['x-auth'] = token;
    }

    if (body) {
        body = JSON.stringify(body);
    }

    return fetch(`${apiBaseUri}${path}`, {
        body,
        headers,
        method,
        mode: 'cors'
    })
    .then((response) => {
        if (!response.ok) {
            return Promise.reject(response);
        }

        return Promise.all([
            response.json(),
            Promise.resolve(response)
        ]);
    })
    .then((responseData) => {
        return {
            data: responseData[0],
            request: responseData[1]
        };
    })
    .catch((error) => {
        if (!error instanceof Response) {
            throw new Error('Invalid argument');
        }

        if (error.status === 401) {
            // unauthorized, remove session data and redirect to homepage
            localStorage.removeItem(localStorageSessionKey);
            window.location = appBaseUri;
        }
        return Promise.reject(error);
    });
}