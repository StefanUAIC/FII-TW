const fs = require('fs');
const path = require('path');

const mimeLookup = {
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

const handleViewRequest = (req, res) => {
    if(req.url === "/login"){
        handleLoginView(req, res);
    } else{
        const fileUrl = '/public' + req.url;
        const filepath = path.resolve('.' + fileUrl);
        const fileExt = path.extname(filepath);
        // check if the file exists
        fs.access(filepath, fs.constants.F_OK, (err) => {
            if(err) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                // read the file content
                fs.readFile(filepath, (err, data) => {
                    if(err) {
                        res.statusCode = 500;
                        res.end('Internal Server Error');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', mimeLookup[fileExt]);
                        res.end(data);
                    }
                });
            }
        });
    }
};

module.exports = handleViewRequest;
