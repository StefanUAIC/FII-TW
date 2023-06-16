const fs = require('fs');
const path = require('path');

const mimeMap = {
    '.js': 'application/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.json': 'application/json',
    '.txt': 'text/plain',
    '.gif': 'image/gif',
};

const handleLoginView = require("./login.view");
const handleRegisterView = require("./register.view");
const handleHomeView = require("./home.view");
const handleScholarlyView = require("./scholarly.view");
const handleProblemlistView = require("./problemlist.view");
const handleClasslistView = require("./classlist.view");
const handleAccountView = require("./account.view");
const handleAccountEditView = require("./account-settings.view");
const handleProblemView = require("./problem.view");
const handleClassView = require("./class.view");

const routeMap = {
    '/': handleLoginView,
    '/register': handleRegisterView,
    '/home': handleHomeView,
    '/problemlist': handleProblemlistView,
    // '/problem/:id': handleProblemView,
    '/classlist': handleClasslistView,
    //  '/class/:id': handleClassView,
    '/account': handleAccountView,
    '/account/edit': handleAccountEditView,
    '/scholarly': handleScholarlyView,
}

const handleViewRequest = (req, res) => {
    const viewHandler = routeMap[req.url];
    if (viewHandler) {
        viewHandler(req, res);
    } else if (req.url.startsWith('/problem/')) {
        handleProblemView(req, res);
    } else if (req.url.startsWith('/class/')) {
        handleClassView(req, res);
    } else {
        const fileUrl = '/public' + req.url;
        const filePath = path.resolve('.' + fileUrl);
        const fileExt = path.extname(filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not Found');
            } else {
                res.writeHead(200, {'Content-Type': mimeMap[fileExt]});
                res.end(data);
            }
        });
    }
};

module.exports = handleViewRequest;
