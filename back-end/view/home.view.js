const viewProcessor = require("../util/viewRequest.util");
const config = require("../config/config").config;
const { validateJwt, extractRoleFromJwt, extractEmailFromJwt } = require("../util/auth.util");
let ejs = require('ejs');
const userModel = require("../model/user.model");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/home-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/home-teacher.ejs";
    }
    return undefined;
}

const handleHomeView = (req, res) => {
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);
        let email = extractEmailFromJwt(req);
        let user = await userModel.findOne({email: email});

        let modifiedTemplate = ejs.render(htmlTemplate, {user: user});
        return modifiedTemplate;
    });
}

module.exports = handleHomeView;