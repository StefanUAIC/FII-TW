const http = require("http");
const mongoose = require("mongoose");

const config = require("./config/config").config;
// const handleApiRequest = require("./controller/controller");
const handleViewRequest = require("./view/controller");
const handleApiRequest = require("./controller/controller");

mongoose.connect(`mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`);

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url.startsWith("/api")) {
        handleApiRequest(req, res);
    } else {
        handleViewRequest(req, res);
    }
});

server.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});
