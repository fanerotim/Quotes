const http = async (method, url, values) => {

    const options = {};

    if (method !== 'GET') {
        options.headers = {
            'Content-Type': 'application/json'
        }
        options.method = method;
        options.body = JSON.stringify(values);
    }

    const response = await fetch(url, options)

    // TODO: CREATE AN EXAMPLE FOR THE FOLLOWING
    // The fetch() function will reject the promise on some errors, 
    // but not if the server responds with an error status like 404: so we also check the response status and throw if it is not OK.

    if (!response.ok) {
        throw new Error('Error in making the request', response.status)
    }

    const result = await response.json()

    return result;
}

const get = http.bind('', 'GET');
const post = http.bind('', 'POST');
const put = http.bind('', 'PUT');

export default {
    get,
    post,
    put
}