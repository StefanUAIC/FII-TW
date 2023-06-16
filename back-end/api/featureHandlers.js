const {getNextId} = require("../util/schemas.util.js");

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
    const UserRepository = require("../repository/user.repository");

    try {
        await UserRepository.updateOne({email: body.email}, body);
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end("Internal server error");
        return;
    }

    res.writeHead(200);
    res.end("OK");
}

const handleAddProblem = async (req, res) => {
    let body = await parseRequestBody(req);
    const {createProblem} = require("../repository/problem.repository");
    const ProblemModel = require("../model/problem.model");
    try {
        body.id = await getNextId(ProblemModel);
        console.log(body)

        await createProblem(body);

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Problema adăugată cu succes'}));
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.end(JSON.stringify({message: 'Nu s-a reușit adăugarea problemei'}));
    }
}
module.exports = {handleSettingsSave, handleAddProblem};
