const viewProcessor = require("../util/viewRequest.util");

const REGISTER_VIEW_PATH = "./view/html/register.html";

const handleRegisterView = (req, res) => {
    viewProcessor(req, res, REGISTER_VIEW_PATH, (htmlTemplate) => {
        return htmlTemplate;
    });
};

module.exports = handleRegisterView;
