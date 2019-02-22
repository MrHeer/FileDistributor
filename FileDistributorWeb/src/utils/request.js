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
    const newOptions = {...options};
    newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
    const response = await fetch(url, newOptions);
    checkStatus(response);
    return await response.json();
}
