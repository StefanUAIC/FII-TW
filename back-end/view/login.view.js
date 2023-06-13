const viewProcessor = require("../util/viewRequest.util");

const LOGIN_VIEW_PATH = "./view/html/index.html";

const handleLoginView = (req, res) => {
    viewProcessor(req, res, LOGIN_VIEW_PATH, (htmlTemplate) => {
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
};

module.exports = handleLoginView;
