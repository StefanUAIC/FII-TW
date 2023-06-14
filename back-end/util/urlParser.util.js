const extractIdFromUrl = (url) => {
    const id = url.split('/')[2];
    return id;
}

module.exports = {extractIdFromUrl};