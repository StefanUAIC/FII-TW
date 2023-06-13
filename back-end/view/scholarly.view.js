const getFileContent = require("../util/getFileContent.util");

const VIEW_PATH = "./view/html/about-student.html";

const handleScholarlyView = (req, res) => {
    getFileContent(VIEW_PATH)
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
        .catch((err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err.message);
        });
};

module.exports = handleScholarlyView;