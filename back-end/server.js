const http = require("http");
const mongoose = require("mongoose");

const config = require("./config/config").config;
const handleViewRequest = require("./view/controller");
const handleApiRequest = require("./controller/controller");

mongoose.connect(`mongodb+srv://user:${config.DB_PASSWORD}@cluster0.9tx4vgi.mongodb.net/?retryWrites=true&w=majority`);

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url.startsWith("/api")) {
        handleApiRequest(req, res);
    } else {
        handleViewRequest(req, res);
    }
});

const user = require("./model/user.model");
user.create({ firstName: "John", lastName: "Doe", email: "test2@yahoo.com", username: "johnnytest", password: "password", role: "Profesor" });

server.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});
