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
        err = {status: 400, message: "Invalid Token. Please login again"};
        throw err;
    }
}

const extractFromJwt = (req, field) => {
    const token = extractCookie(req, "token");

    if (!token) {
        err = {status: 500, message: "No authorization token found"};
        throw err;
    }

    try {
        const decoded = jwt.verify(token, config.SECRET_KEY);
        return decoded[field];
    } catch (err) {
        err = {status: 400, message: "Invalid Token. Please login again"};
        throw err;
    }
}

const extractEmailFromJwt = (req) => {
    try {
        return extractFromJwt(req, "email");
    }
    catch (err) {
        throw err;
    }
    return undefined;
}

const extractRoleFromJwt = (req) => {
    try{
        return extractFromJwt(req, "role");        
    }
    catch (err) {
        console.log(err);
    }
    return undefined;
}

module.exports = { validateJwt, extractEmailFromJwt, extractRoleFromJwt };