const { validateJwt, extractUserEmailFromJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const { extractCookie } = require("../util/cookieParser.util");
const userModel = require("../model/user.model");

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
    viewProcessor(req, res, getViewByRole(req), async (htmlTemplate) => {
        validateJwt(req);
        let email = extractUserEmailFromJwt(req);
        let modifiedTemplate = htmlTemplate;
        let user = await userModel.findOne({email: email});

        modifiedTemplate = ejs.render(htmlTemplate, {user: user});

        return modifiedTemplate;
    });
}

module.exports = handleAccountView;