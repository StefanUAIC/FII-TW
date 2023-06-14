const { extractCookie } = require("../util/cookieParser.util");
const viewProcessor = require("../util/viewRequest.util");
const config = require("../config/config").config;
const { validateJwt } = require("../util/auth.util");
let ejs = require('ejs');

function getViewPath(req) {
    let role = extractCookie(req, "role");
    if (role === config.STUDENT_ROLE) { 
        return "./view/templates/home-student.ejs";
    }
    else if (role === config.TEACHER_ROLE) {
        return "./view/templates/home-teacher.ejs";
    }
    return undefined;
}

const handleHomeView = (req, res) => {
    viewProcessor(req, res, getViewPath(req), (htmlTemplate) => {
        validateJwt(req);
        const userData = {
            name: "Dummy_user"
        }
        let modifiedTemplate = ejs.render(htmlTemplate, {user: userData});
        return modifiedTemplate;
    });
}

module.exports = handleHomeView;