const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const { extractRoleFromJwt, extractEmailFromJwt } = require("../util/auth.util");
const userModel = require("../model/user.model");

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
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);

        let email = extractEmailFromJwt(req);
        let user = await userModel.findOne({email: email});

        let modifiedTemplate = ejs.render(htmlTemplate, {user: user});
        return modifiedTemplate;
    });
}

module.exports = handleClasslistView;