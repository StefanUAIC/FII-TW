const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const ejs = require('ejs');
const extractId = require("../util/urlParser.util").extractIdFromUrl;

function getViewPath() {
    //./view/templates/problem-teacher.ejs
    return "./view/templates/problem-student.ejs";
}

const handleProblemView = (req, res) => {
    const problemId = extractId(req.url);
    console.log("Problem id: " + problemId);
    viewProcessor(req, res, getViewPath(), (htmlTemplate) => {
        validateJwt(req);
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
}

module.exports = handleProblemView;