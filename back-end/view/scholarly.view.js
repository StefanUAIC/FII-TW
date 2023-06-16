const viewProcessor = require("../util/viewRequest.util");

const ABOUT_VIEW_PATH = "./view/html/about-student.html";

const handleScholarlyView = (req, res) => {
    viewProcessor(req, res, ABOUT_VIEW_PATH, (htmlTemplate) => {
        return htmlTemplate;
    });
};

module.exports = handleScholarlyView;