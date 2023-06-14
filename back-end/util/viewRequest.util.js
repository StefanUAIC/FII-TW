const getFileContent = require("./getFileContent.util");

const processViewRequest = (req, res, templatePath, callback) => {
    if (!templatePath){
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end("Access denied.");
    }
    getFileContent(templatePath)
      .then(async (data) => {
        try {
          const modifiedTemplate = await callback(data); // Process the HTML template
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(modifiedTemplate);
        } 
        catch (err) {
          res.writeHead(err.status || 500, { 'Content-Type': 'text/plain' });
          res.end(err.message);
        }
      })
      .catch((err) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(err.message);
      });
  };

module.exports = processViewRequest;