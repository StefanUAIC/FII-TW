const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const { extractRoleFromJwt } = require("../util/auth.util");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/classes-student.ejs";
    }
    else if (role === config.TEACHER_ROLE) {
        return "./view/templates/classes-teacher.ejs";
    }
    return undefined;
}

const handleClasslistView = (req, res) => {
    viewProcessor(req, res, getViewPath(req), (htmlTemplate) => {
        //TODO get data from the database
        validateJwt(req);
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
}

module.exports = handleClasslistView;