const viewProcessor = require("../util/viewRequest.util");
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const ejs = require('ejs');

function getViewPath() {
    //./view/templates/class-teacher.ejs
    return "./view/templates/class-student.ejs";
}

const handleClassView = (req, res) => {
    const classId = extractId(req.url);
    console.log("Class id: " + classId);
    viewProcessor(req, res, getViewPath(), (htmlTemplate) => {
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
}

module.exports = handleClassView;