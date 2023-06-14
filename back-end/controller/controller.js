const {authenticationController} = require('./authenticationController');

const handleApiRequest = (req, res) => {
    if (req.url.startsWith("/api/auth")) {
        authenticationController(req, res);
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
}

module.exports = handleApiRequest;