export default (path, method, body = null, authenticate = true) => {
    const apiBaseUri = 'http://localhost:8000/';

    const headers = {
        'content-type': 'application/json'
    };
    if (authenticate) {
        const token = localStorage.getItem('authToken');
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
            return Promise.reject('Failed request');
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
        return Promise.reject(error.message);
    });
}