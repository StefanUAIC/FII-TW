const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');

const handleAccountEditView = (req, res) => {
    const VIEW_PATH = "./view/templates/account-settings.ejs";
    
    viewProcessor(req, res, VIEW_PATH, (htmlTemplate) => {
        //TODO get data from the database
        validateJwt(req);
        return htmlTemplate;
    });
}

module.exports = handleAccountEditView;