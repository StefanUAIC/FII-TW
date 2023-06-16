const {validateJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const {extractRoleFromJwt} = require("../util/auth.util");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/problem-selector-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/problem-selector-teacher.ejs";
    }
    return undefined;
}

const handleProblemlistView = (req, res) => {
    //TODO get the problem list data from the database
    viewProcessor(req, res, getViewPath(req), (htmlTemplate) => {
        validateJwt(req);
        return htmlTemplate;
    });
}

module.exports = handleProblemlistView;