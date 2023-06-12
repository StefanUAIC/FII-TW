const http = require("http");

const config = require("./config/config").config;
// const handleApiRequest = require("./controller/controller");
const handleViewRequest = require("./view/controller");

const server = http.createServer((req, res) => {
    const url = req.url;
    // if (url.startsWith("/api")) {
    //     handleApiRequest(req, res);
    // } else {
    //     handleViewRequest(req, res);
    // }
    handleViewRequest(req, res);
});

server.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});
