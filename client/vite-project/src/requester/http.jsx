const http = async (method, url, options) => {
 
    const response = await fetch(url)
    const result = await response.json()

    return result;
}

const get = http.bind('', 'GET');

export default {
    get,
}