const {authenticationController} = require('./authenticationController');
const {
    handleSettingsSave,
    handleAddRating,
    handleAddComment,
    handleClassCreation,
    handleClassJoin,
    handleHomeworkCreation,
    handleAddProblem,
    handleHomeworkCodeSave,
    handleHomeworkSubmission,
    handleHomeworkGrading,
    handleGetProblem,
} = require('../api/featureHandlers');

const handleApiRequest = (req, res) => {
    if (req.url.startsWith("/api/auth")) {
        authenticationController(req, res);
    } 
    else if (req.url.startsWith("/api/settings") && req.method === "POST") {
        handleSettingsSave(req, res).catch((err) => {
            console.log("handleSettingsSave error. " + err);
        });
    } 
    else if (req.url.startsWith("/api/classes/create") && req.method === "POST") {
        handleClassCreation(req, res).catch((err) => {
            console.log("handleClassCreation error. " + err);
        });
    } 
    else if (req.url.startsWith("/api/classes/join") && req.method === "POST") {
        handleClassJoin(req, res).catch((err) => {
            console.log("handleClassJoin error. " + err);
        });
    } 
    else if (req.url.startsWith("/api/homeworks/create") && req.method === "POST") {
        handleHomeworkCreation(req, res).catch((err) => {
            console.log("handleHomeworkCreation error. " + err);
        });
    } 
    else if (req.url.startsWith("/api/rating") && req.method === "POST") {
        handleAddRating(req, res).catch((err) => {
            console.log("handleAddRating error. " + err);
        });
    } 
    else if (req.url.startsWith("/api/comment") && req.method === "POST") {
        handleAddComment(req, res).catch((err) => {
            console.log("handleAddComment error. " + err);
        });
    } 
    else if (req.url.startsWith("/api/homeworks/save") && req.method === "PUT") {
        handleHomeworkCodeSave(req, res);
    }
    else if (req.url.startsWith("/api/homeworks/send") && req.method === "PUT") {
        handleHomeworkSubmission(req, res);
    }
    else if (req.url.startsWith("/api/homeworks/grade") && req.method === "PUT") {
        handleHomeworkGrading(req, res);
    }
    else if (req.url.startsWith("/api/problems")) {
        console.log(req.url)
        if (req.url === "/api/problems/add" && req.method === "POST") {
            handleAddProblem(req, res).catch((err) => {
                console.log("handleAddProblem error. " + err);
            });
        } else if (req.url.startsWith("/api/problems/get") && req.method === "GET") {
            handleGetProblem(req, res).catch((err) => {
                console.log("handleGetProblem error. " + err);
            });
        }
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}

module.exports = handleApiRequest;
