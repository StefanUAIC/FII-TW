const {authenticationController} = require('./authenticationController');
const {handleSettingsSave, handleClassCreation, handleClassJoin, handleHomeworkCreation, handleAddProblem} = require('../api/featureHandlers');

const handleApiRequest = (req, res) => {
    if (req.url.startsWith("/api/auth")) {
        authenticationController(req, res);
    } 
    else if (req.url.startsWith("/api/settings") && req.method === "POST") {
        handleSettingsSave(req, res);
    }
    else if (req.url.startsWith("/api/classes/create") && req.method === "POST") {
        handleClassCreation(req, res);
    }
    else if (req.url.startsWith("/api/classes/join") && req.method === "POST") {
        handleClassJoin(req, res);
    }
    else if (req.url.startsWith("/api/homeworks/create") && req.method === "POST") {
        handleHomeworkCreation(req, res);
    }
    else if (req.url.startsWith("/api/problems") && req.method === "POST") {
        console.log(req.url)
        if (req.url === "/api/problems/add") {
            console.log("add")
            handleAddProblem(req, res).catch((err) => {
                console.log("handleAddProblem error. " + err);
            });
        }
    }
    else {
        res.writeHead(404);
        res.end('Not found');
    }
}

module.exports = handleApiRequest;