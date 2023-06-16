const { validateJwt, extractEmailFromJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const UserRepository = require("../repository/user.repository");
let ejs = require('ejs');

const handleAccountEditView = (req, res) => {
    const VIEW_PATH = "./view/templates/account-settings.ejs";
    
    viewProcessor(req, res, VIEW_PATH, async (htmlTemplate) => {
        validateJwt(req);
        let email = extractEmailFromJwt(req);
        let modifiedTemplate = htmlTemplate;
        let user = await UserRepository.getUser({email: email});

        modifiedTemplate = ejs.render(htmlTemplate, {user: user});

        return modifiedTemplate;
    });
}

module.exports = handleAccountEditView;
