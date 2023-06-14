const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const ejs = require('ejs');
const config = require("../config/config").config;
const { extractCookie } = require("../util/cookieParser.util");

function getViewPath(req) {
    let role = extractCookie(req, "role");
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/class-student.ejs";
    }
    else if (role === config.TEACHER_ROLE) {
        return "./view/templates/class-teacher.ejs";
    }
    return undefined;
}

const handleClassView = (req, res) => {
    const classId = extractId(req.url);
    console.log("Class id: " + classId);

    viewProcessor(req, res, getViewPath(req), (htmlTemplate) => {
        validateJwt(req);
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
}

module.exports = handleClassView;