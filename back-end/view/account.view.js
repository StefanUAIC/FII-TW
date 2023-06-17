const {validateJwt, extractEmailFromJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const {extractRoleFromJwt} = require("../util/auth.util");

const UserRepository = require("../repository/user.repository");

function getViewByRole(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/myAccount-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/myAccount-teacher.ejs";
    }
    return undefined;
}

const handleAccountView = (req, res) => {
    viewProcessor(req, res, getViewByRole(req), async (htmlTemplate) => {
        validateJwt(req);
        let email = extractEmailFromJwt(req);
        let modifiedTemplate;
        let user = await UserRepository.getUser({email: email});

        modifiedTemplate = ejs.render(htmlTemplate, {user: user});

        return modifiedTemplate;
    });
}

module.exports = handleAccountView;
