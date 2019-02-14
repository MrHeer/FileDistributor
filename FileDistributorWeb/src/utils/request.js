import fetch from 'dva/fetch';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a propmise.
 *
 * @param {string} url       The URL we want to request
 * @param {string} [options] The options we want to pass to "fetch"
 * @return {object}          An object containing either "data" or "error"
*/
export default async function request(url, options) {
    const response = await fetch(url, options);
    checkStatus(response);
    return await response.json();
}
