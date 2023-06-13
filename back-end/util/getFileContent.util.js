const fs = require('fs');

const getFileContent = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    }); 
}

const processViewRequest = (req, res, templatePath, callback) => {
    getFileContent(templatePath)
        .then((data) => {
            let html = callback(data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        })
        .catch((err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err.message);
        });
}

module.exports = processViewRequest;
