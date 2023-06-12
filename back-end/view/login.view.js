const getFileContent = require("../util/getFileContent.util");
const respondFile = require("../util/getFileContent.util");

const LOGIN_VIEW_PATH = "./view/template/index.html";

const handleLoginView = (req, res) => {
    getFileContent(LOGIN_VIEW_PATH)
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
        .catch((err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err.message);
        });
};

module.exports = handleLoginView;
