const viewProcessor = require("../util/viewRequest.util");
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const ejs = require('ejs');

function getViewPath() {
    //./view/templates/class-teacher.ejs
    return "./view/templates/class-student.ejs";
}

const handleClassView = (req, res) => {
    const classId = extractId(req.url);
    // viewProcessor(req, res, getViewPath(), (htmlTemplate) => {
    //     let modifiedTemplate = htmlTemplate;
    //     return modifiedTemplate;
    // });
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Class with id: " + classId + " is being viewed.");
}

module.exports = handleClassView;