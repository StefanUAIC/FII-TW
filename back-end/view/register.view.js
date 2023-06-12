const getFileContent = require("../util/getFileContent.util");

const REGISTER_VIEW_PATH = "./view/html/register.html";

const handleLoginView = (req, res) => {
    getFileContent(REGISTER_VIEW_PATH)
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
