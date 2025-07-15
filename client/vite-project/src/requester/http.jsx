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
    const result = await response.json()

    return result;
}

const get = http.bind('', 'GET');
const post = http.bind('', 'POST');

export default {
    get,
    post
}