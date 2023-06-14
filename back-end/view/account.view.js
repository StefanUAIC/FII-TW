const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const { extractCookie } = require("../util/cookieParser.util");

function getViewByRole(req) {
    let role = extractCookie(req, "role");
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/myAccount-student.ejs";
    }
    else if (role === config.TEACHER_ROLE) {
        return "./view/templates/myAccount-teacher.ejs";
    }
    return undefined;
}

const handleAccountView = (req, res) => {
    viewProcessor(req, res, getViewByRole(req), (htmlTemplate) => {
        //TODO get data from the database
        validateJwt(req);
        return htmlTemplate;
    });
}

module.exports = handleAccountView;