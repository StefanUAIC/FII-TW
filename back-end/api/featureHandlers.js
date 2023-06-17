const {getNextId} = require("../util/schemas.util.js");
const config = require("../config/config").config;
const {extractEmailFromJwt, extractRoleFromJwt} = require("../util/auth.util");
const parseRequestBody = (req) => {
    // This function returns a promise that resolves to the parsed body of the request.
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
const verifyRole = (req, desiredRole) => {
    try {
        const role = extractRoleFromJwt(req);
        return role === desiredRole;
    } catch (err) {
        console.log(err);
        return false;
    }
}
const handleSettingsSave = async (req, res) => {
    let body = await parseRequestBody(req);
    const userModel = require("../model/user.model");
    try {
        await userModel.updateOne({email: body.email}, body);
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("Internal server error");
        return;
    }

    res.writeHead(200);
    res.end("OK");
}

const handleAddRating = async (req, res) => {
    let body = await parseRequestBody(req);
    const {addRatingProblem} = require("../repository/problem.repository");
    const userModel = require("../model/user.model");
    try {
        const email = extractEmailFromJwt(req);
        const result = await userModel.findOne({email: email});
        body.content.user = result._id;
        await addRatingProblem(body.content, body.problemId);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Rating adăugat cu succes'}));
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end(JSON.stringify({message: 'Nu s-a reușit adăugarea rating ului'}));
    }
}

const handleAddComment = async (req, res) => {
    let body = await parseRequestBody(req);
    const {addCommentProblem} = require("../repository/problem.repository");
    try {
        await addCommentProblem(body.content, body.problemId);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Comentariu adăugat cu succes'}));
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end(JSON.stringify({message: 'Nu s-a reușit adăugarea comentariului'}));
    }
}

const handleAddProblem = async (req, res) => {
    // Check if the user is a teacher
    if (!verifyRole(req, config.TEACHER_ROLE)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    let body = await parseRequestBody(req);
    const {createProblem} = require("../repository/problem.repository");
    const ProblemModel = require("../model/problem.model");
    try {
        body.id = await getNextId(ProblemModel);

        await createProblem(body);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Problema adăugată cu succes'}));
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end(JSON.stringify({message: 'Nu s-a reușit adăugarea problemei'}));
    }
}

const handleClassCreation = async (req, res) => {
    let body = await parseRequestBody(req); //{name: "nume", description: "descriere"}

    if (body.name.length > 16) {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("Numele clasei nu poate avea mai mult de 16 caractere");
        return;
    }

    const {v4: uuidv4} = require('uuid');
    body.code = uuidv4();

    const classModel = require("../model/class.model");
    const userModel = require("../model/user.model");

    try {
        const email = extractEmailFromJwt(req);
        if (!verifyRole(req, config.TEACHER_ROLE)) {
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
    } catch (err) {
        console.log(err);
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Internal server error. Nu s-a putut crea clasa");
        return;
    }

    res.writeHead(200);
    res.end("OK");
}

const handleClassJoin = async (req, res) => {
    let body = await parseRequestBody(req); //{code: "{class code}"}

    const classModel = require("../model/class.model");
    const userModel = require("../model/user.model");

    try {
        const email = extractEmailFromJwt(req);
        if (!verifyRole(req, config.TEACHER_ROLE)) {
            res.writeHead(403);
            res.end("Forbidden");
            return;
        }

        const searchedClass = await classModel.findOne({code: body.code});
        if (!searchedClass) {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Cod invalid. Clasa nu a fost gasită.");
            return;
        }

        const student = await userModel.findOne({email: email});
        if (!searchedClass.students.includes(student._id)) {
            searchedClass.students.push(student._id);
            await searchedClass.save();
        }
    } catch (err) {
        console.log(err);
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Nu s-a putut efectua alăturarea la clasă");
        return;
    }

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("OK");
}

const handleHomeworkCreation = async (req, res) => {
    let body = await parseRequestBody(req); //{title, deadline, problem, class}

    try {
        if (!verifyRole(req, config.TEACHER_ROLE)) {
            res.writeHead(403);
            res.end("Forbidden");
            return;
        }

        const homeworkModel = require("../model/homework.model");
        const getNextId = require("../util/schemas.util").getNextId;
        body.id = await getNextId(homeworkModel);
        await homeworkModel.create(body);

        const classModel = require("../model/class.model");
        const currClass = await classModel.findOne({id: body.class});

        await classModel.updateOne({id: body.class}, {$set: {homework: body.id}});

        const homeworkSolutionModel = require("../model/homeworkSolution.model");
        for (let i = 0; i < currClass.students.length; i++) {
            const studentId = currClass.students[i];
            await homeworkSolutionModel.create({student: studentId, homework: body.id});
        }
    } catch (err) {
        console.log(err);
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Nu s-a putut crea tema");
        return;
    }

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("OK");
}

module.exports = {handleSettingsSave, handleAddRating, handleAddComment, handleClassCreation, handleClassJoin, handleHomeworkCreation, handleAddProblem};
