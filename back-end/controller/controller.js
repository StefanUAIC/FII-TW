const {authenticationController} = require('./authenticationController');
const {handleSettingsSave, handleClassCreation, handleClassJoin} = require('../api/featureHandlers');

const handleApiRequest = (req, res) => {
    if (req.url.startsWith("/api/auth")) {
        authenticationController(req, res);
    } 
    else if (req.url.startsWith("/api/settings") && req.method === "POST") {
        handleSettingsSave(req, res);
    }
    else if (req.url.startsWith("/api/classes/creations") && req.method === "POST") {
        handleClassCreation(req, res);
    }
    else if (req.url.startsWith("/api/classes/join") && req.method === "POST") {
        handleClassJoin(req, res);
    }
    else {
        res.writeHead(404);
        res.end('Not found');
    }
}

module.exports = handleApiRequest;