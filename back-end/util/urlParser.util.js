const extractIdFromUrl = (url) => {
    return url.split('/')[2].split('?')[0];
}

const parseQueryParam = (url, param) => {
    let query = url.split('?')[1];
    if (!query) {
        return undefined;
    }
    let params = query.split('&');
    for (let i = 0; i < params.length; i++) {
        let paramPair = params[i].split('=');
        if (paramPair[0] === param) {
            return paramPair[1];
        }
    }
    return undefined;
}

module.exports = {extractIdFromUrl, parseQueryParam};