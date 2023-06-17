const {validateJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const ejs = require('ejs');
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const config = require("../config/config").config;
const { extractRoleFromJwt, extractEmailFromJwt } = require("../util/auth.util");
const parseQueryParam = require("../util/urlParser.util").parseQueryParam;
const problemModel = require("../model/problem.model");
const homeworkSolutionModel = require("../model/homeworkSolution.model");
const homeworkModel = require("../model/homework.model");
const userModel = require("../model/user.model");
const classModel = require("../model/class.model");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/problem-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/problem-teacher.ejs";
    }
    return undefined;
}

async function getStudentHomeworks(email) {
    let homeworks = [];

    let student = await userModel.findOne({email: email});
    let homeworkSolutions = await homeworkSolutionModel.find({student: student.id});

    for (let i = 0; i < homeworkSolutions.length; i++) {
        let homeworkSolution = homeworkSolutions[i];
        let homework = await homeworkModel.findOne({id: homeworkSolution.homework});

        homeworks.push({
            title: homework.title,
            id: homeworkSolution.homework,
        })
    }

    return homeworks;
}

async function getTeacherHomeworks() {
    return [];
}

async function getHomeworksByRole(role, email) {
    if (role === config.STUDENT_ROLE) {
        return getStudentHomeworks(email);
    }
    else if (role === config.TEACHER_ROLE) {
        return getTeacherHomeworks();
    }
    return [];
}

async function getSolutionForStudent(req, email) {
    let homeworkId = parseQueryParam(req.url, "homework");
    let student = await userModel.findOne({email: email});

    if (!homeworkId) {
        return {
            homeworkId: 0,
            status: "-",
            grade: "-",
            teacherName: "-",
            studentId: student._id,
            description: "Nu ai selectat nicio temă!",
            sourceCode: config.DEFAULT_SOURCE_CODE
        }
    }
    homeworkId = parseInt(homeworkId);

    let homeworkSolution = await homeworkSolutionModel.findOne({student: student.id, homework: homeworkId});
    if (!homeworkSolution) {
        throw {status: 404, message: "Page not found"};
    }

    //3 queryuri doar pt numele profesorului, nice
    let homework = await homeworkModel.findOne({id: homeworkId});
    let currClass = await classModel.findOne({id: homework.class});
    let teacher = await userModel.findOne({_id: currClass.teacher});

    let solution = {
        homeworkId: homeworkId,
        status: homeworkSolution.status,
        grade: homeworkSolution.grade,
        teacherName: teacher.firstName + " " + teacher.lastName,
        studentId: student.id,
        description: homeworkSolution.description,
        sourceCode: homeworkSolution.sourceCode,
    }

    return solution;
}

async function getSolutionForTeacher() {
    return null;
}

async function getSolutionByRole(req, role, email) {
    if (role === config.STUDENT_ROLE) {
        return getSolutionForStudent(req, email);
    }
    else if (role === config.TEACHER_ROLE) {
        return getSolutionForTeacher();
    }
    return undefined;
}

// /problem/{id}?homework={id}
const handleProblemView = (req, res) => {
    const problemId = extractId(req.url);
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);
        
        let problem = await problemModel.findOne({id: problemId});
        if (!problem) {
            err = {
                status: 404,
                message: "Problem not found"
            };
            throw err;
        }

        let role = extractRoleFromJwt(req);
        let email = extractEmailFromJwt(req);

        //ca sa afisez dropdownul cu teme
        let homeworks = await getHomeworksByRole(role, email);
        
        //ca sa pe pagina informatiile pentru tema selectata din dropdown
        let solution = await getSolutionByRole(req, role, email);

        let modifiedTemplate = ejs.render(htmlTemplate, {problem: problem, homeworks: homeworks, solution: solution});
        return modifiedTemplate;
    });
}

module.exports = handleProblemView;