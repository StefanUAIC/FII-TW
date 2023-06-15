const config = require("../config/config").config;
const { extractEmailFromJwt, extractRoleFromJwt } = require("../util/auth.util");

const parseRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(JSON.parse(body));
        });
        req.on('error', (err) => {
            reject(err);
        });
    });
}

const handleSettingsSave = async (req, res) => {
    let body = await parseRequestBody(req);
    const user = require("../model/user.model"); 

    try {
        await user.updateOne({email: body.email}, body);
    }
    catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("Internal server error");
        return;
    }

    res.writeHead(200);
    res.end("OK");
}

const handleClassCreation = async (req, res) => {
    let body = await parseRequestBody(req); //{name: "nume", description: "descriere"}

    const { v4: uuidv4 } = require('uuid');
    body.code = uuidv4();

    const classModel = require("../model/schemas.model").classModel; 
    const userModel = require("../model/user.model");

    try {
        const email = extractEmailFromJwt(req);
        const role = extractRoleFromJwt(req);
        if (role !== config.TEACHER_ROLE) {
            res.writeHead(403);
            res.end("Forbidden");
            return;
        }

        const result = await userModel.findOne({email: email});
        body.teacher = result._id;

        const getNextId = require("../util/schemas.util").getNextId;
        body.id = await getNextId(classModel);
        body.students = [];

        await classModel.create(body);
    }
    catch (err) {
        console.log(err);
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Internal server error. Cannot create class");
        return;
    }

    res.writeHead(200);
    res.end("OK");
}

const handleClassJoin = async (req, res) => {
    let body = await parseRequestBody(req); //{code: "{class code}"}

    const classModel = require("../model/schemas.model").classModel;
    const userModel = require("../model/user.model");

    try {
        const email = extractEmailFromJwt(req);
        const role = extractRoleFromJwt(req);
        if (role !== config.STUDENT_ROLE) {
            res.writeHead(403, {"Content-Type": "text/plain"});
            res.end("Forbidden");
            return;
        }

        const searchedClass = await classModel.findOne({code: body.code});
        if (!searchedClass) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Invalid code. Class not found");
            return;
        }

        const student = await userModel.findOne({email: email});
        if (!searchedClass.students.includes(student._id)) {
            searchedClass.students.push(student._id);
            await searchedClass.save();
        }
    }
    catch (err) {
        console.log(err);
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Cannot join class");
        return;
    }

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("OK");
}

module.exports = {handleSettingsSave, handleClassCreation, handleClassJoin};