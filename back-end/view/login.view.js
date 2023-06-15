const viewProcessor = require("../util/viewRequest.util");
const { validateJwt } = require("../util/auth.util");

const LOGIN_VIEW_PATH = "./view/html/index.html";

const handleLoginView = (req, res) => {
    try{
        validateJwt(req);
        res.writeHead(302, { Location: '/home' });
        res.end();
    }
    catch(err){
        console.log(err);
        viewProcessor(req, res, LOGIN_VIEW_PATH, (htmlTemplate) => {
            let modifiedTemplate = htmlTemplate;
            return modifiedTemplate;
        });
    }
};

module.exports = handleLoginView;
