import useGetAccessToken from "../hooks/useGetAccessToken";
import useLogoutOn401Error from "../hooks/useLogoutOn401Error";

const http = async (method, url, values) => {
    const getToken = useGetAccessToken();
    const options = {};
    const accessToken = getToken();

    if (method !== 'GET') {
        options.headers = {
            'Content-Type': 'application/json'
        }

        if (accessToken) {
            options.headers['accessToken'] = accessToken.auth;
        }

        options.method = method;
        options.body = JSON.stringify(values);
    }

    const response = await fetch(url, options)
    const result = await response.json()

    if (!response.ok) {

        // TODO: think if this needs to have this new error constructed / can't the actual response be thrown instead of creating a custom error?
        if (response.status === 401) {
            const error = new Error('Authorization is required for this request.');
            error.status = 401;
            throw error;
        }
 
        throw result;
    }

    // TODO: CREATE AN EXAMPLE FOR THE FOLLOWING
    // The fetch() function will reject the promise on some errors, 
    // but not if the server responds with an error status like 404: so we also check the response status and throw if it is not OK.

    return result;
}

const get = http.bind('', 'GET');
const post = http.bind('', 'POST');
const put = http.bind('', 'PUT');
const deleteOne = http.bind('', 'DELETE')

export default {
    get,
    post,
    put,
    deleteOne
}