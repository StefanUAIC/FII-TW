const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const ejs = require('ejs');
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const config = require("../config/config").config;
const { extractRoleFromJwt } = require("../util/auth.util");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/problem-student.ejs";
    }
    else if (role === config.TEACHER_ROLE) {
        return "./view/templates/problem-teacher.ejs";
    }
    return undefined;
}

const handleProblemView = (req, res) => {
    const problemId = extractId(req.url);
    console.log("Problem id: " + problemId);
    viewProcessor(req, res, getViewPath(req), (htmlTemplate) => {
        validateJwt(req);

        let modifiedTemplate = ejs.render(htmlTemplate, {code: {source: 'cout << "hello world"; '}});
        return modifiedTemplate;
    });
}

module.exports = handleProblemView;