const {authenticationController} = require('./authenticationController');
const {handleSettingsSave} = require('../api/featureHandlers');
const {handleAddProblem} = require('../api/featureHandlers');
const handleApiRequest = (req, res) => {
    if (req.url.startsWith("/api/auth")) {
        authenticationController(req, res);
    } else if (req.url.startsWith("/api/settings") && req.method === "POST") {
        handleSettingsSave(req, res).catch(() => {
            console.log("handleSettingsSave error")
        });
    } else if (req.url.startsWith("/api/problems") && req.method === "POST") {
        console.log(req.url)
        if (req.url === "/api/problems/add") {
            console.log("add")
            handleAddProblem(req, res).catch(() => {
                console.log("handleAddProblem error")
            });
        }
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}

module.exports = handleApiRequest;