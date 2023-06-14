const jwt = require('jsonwebtoken');
const { extractCookie } = require('./cookieParser.util');
const config = require("../config/config").config;

const validateJwt = (req) => {
    const token = extractCookie(req, "token");
    let err = null;
    if (!token) {
        err = {status: 401, message: "Unauthorized"};
        throw err;
    }
    try {
        const verified = jwt.verify(token, config.SECRET_KEY);
    } catch (err) {
        err = {status: 400, message: "Invalid Token"};
        throw err;
    }
}

const extractUserEmailFromJwt = (req) => {
    const token = extractCookie(req, "token");

    if (!token) {
        err = {status: 500, message: "No authorization token found"};
        throw err;
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        return decoded.username;
    } catch (err) {
        err = {status: 400, message: "Invalid Token"};
        throw err;
    }
}

module.exports = { validateJwt, extractUserEmailFromJwt };