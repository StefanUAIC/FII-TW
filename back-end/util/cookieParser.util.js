
const extractCookie = (req, cookieName) => {
    let cookie = req.headers.cookie;
    if (!cookie) {
        return null;
    }
    let cookieValue = cookie.split(";").find(c => c.trim().startsWith(`${cookieName}=`));
    if (cookieValue) {
        cookieValue = cookieValue.split("=")[1];
    }
    return cookieValue;
}

module.exports = {extractCookie};