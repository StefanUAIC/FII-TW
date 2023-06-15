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

// const {problemModel, homeworkModel, homeworkSolutionModel, userModel, classModel} = require("./model/schemas.model");
// //create mock problem and save it to database
// let problem = new problemModel({
//     id: "1",
//     title: "Hello World",

//     description: "Să se scrie un program care afișează mesajul \"Hello World\" pe ecran.",
//     input: "Programul nu primește date de intrare.",
//     output: "Programul afișează pe ecran mesajul cerut",
//     restrictions: "Fără restricții",

//     difficulty: "Usor",
//     chapter: "Algoritmi elementari",
//     grade: "IX",
//     author: "Prof Info",
//     tags: ["usor", "afisare", "c++"],
//     rating: [],
//     comments: []
// });
// problem.save();


server.listen(config.PORT, config.HOST, () => {
    console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});
