const getFileContent = require("../util/getFileContent.util");
let ejs = require('ejs');

const handleAccountEditView = (req, res) => {

    //TODO get data from the database
    const HOME_VIEW_PATH = "./view/templates/account-settings.ejs";
    
    getFileContent(HOME_VIEW_PATH)
        .then((data) => {
            let html = ejs.render(data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        })
        .catch((err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err.message);
        });
}

module.exports = handleAccountEditView;