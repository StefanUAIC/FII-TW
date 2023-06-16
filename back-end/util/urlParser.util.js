const extractIdFromUrl = (url) => {
    return url.split('/')[2];
}

module.exports = {extractIdFromUrl};