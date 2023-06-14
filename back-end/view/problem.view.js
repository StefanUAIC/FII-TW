const viewProcessor = require("../util/viewRequest.util");
const ejs = require('ejs');
const extractId = require("../util/urlParser.util").extractIdFromUrl;

function getViewPath() {
    //./view/templates/problem-teacher.ejs
    return "./view/templates/problem-student.ejs";
}

const handleProblemView = (req, res) => {
    const problemId = extractId(req.url);
    // viewProcessor(req, res, getViewPath(), (htmlTemplate) => {
    //     let modifiedTemplate = htmlTemplate;
    //     return modifiedTemplate;
    // });
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Problem with id: " + problemId + " is being viewed.");
}

module.exports = handleProblemView;