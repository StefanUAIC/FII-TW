const fs = require('fs');


const respondFile = (req, res, filePath) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(`./view/template/${filePath}`, (err, data) => {
        if(err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        } else {
            res.end(data);
        }
    });
}

module.exports = respondFile;
