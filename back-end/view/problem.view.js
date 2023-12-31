const {validateJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const ejs = require('ejs');
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const config = require("../config/config").config;
const { extractRoleFromJwt, extractEmailFromJwt } = require("../util/auth.util");
const UserRepository = require("../repository/user.repository");
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

async function getStudentHomeworks(email, problemId) {
    let homeworks = [];

    let student = await userModel.findOne({email: email});
    let homeworkSolutions = await homeworkSolutionModel.find({student: student.id});
    for (let i = 0; i < homeworkSolutions.length; i++) {
        let homeworkSolution = homeworkSolutions[i];
        let homework = await homeworkModel.findOne({id: homeworkSolution.homework});
        if (homework.problem != problemId) {
            continue;
        }

        homeworks.push({
            title: homework.title,
            id: homeworkSolution.homework,
        })
    }

    return homeworks;
}

async function getTeacherHomeworks(email, problemId) {
    let homeworks = [];
    let teacher = await userModel.findOne({email: email});
    let classes = await classModel.find({teacher: teacher._id});
    for (let currClass of classes) {
        if (currClass.homework == 0) {
            continue;
        }

        let homework = await homeworkModel.findOne({id: currClass.homework});
        if (homework.problem != problemId) {
            continue;
        }

        for (let studentId of currClass.students) {
            let homeworkSolution = await homeworkSolutionModel.findOne({student: studentId, homework: homework.id});
            if (homeworkSolution.status != config.HW_STATUS.SUBMITTED) {
                continue;
            }

            let student = await userModel.findOne({_id: studentId});
            homeworks.push({
                title: homework.title,
                id: homeworkSolution.homework,
                studentId: studentId.toString(),
                studentName: student.firstName + " " + student.lastName,
            });
        }
    }

    return homeworks;
}

async function getHomeworksByRole(role, email, problemId) {
    if (role === config.STUDENT_ROLE) {
        return getStudentHomeworks(email, problemId);
    }
    else if (role === config.TEACHER_ROLE) {
        return getTeacherHomeworks(email, problemId);
    }
    return [];
}

async function getSolutionForStudent(req, email, problemId) {
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

    let homework = await homeworkModel.findOne({id: homeworkId});
    if (homework.problem != problemId) {
        throw {status: 404, message: "Not found"};
    }

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

async function getSolutionForTeacher(req, email, problemId) {
    let homeworkId = parseQueryParam(req.url, "homework");
    let studentId = parseQueryParam(req.url, "student");
    if (!homeworkId || !studentId) {
        return {
            homeworkId: 0,
            sourceCode: config.DEFAULT_SOURCE_CODE
        }
    }
    homeworkId = parseInt(homeworkId);

    let homework = await homeworkModel.findOne({id: homeworkId});
    if (!homework) {
        throw {status: 404, message: "Page not found"};
    }
    if (homework.problem != problemId) {
        throw {status: 404, message: "Page not found"};
    }
    
    let homeworkSolution = await homeworkSolutionModel.findOne({student: studentId, homework: homeworkId});
    if (!homeworkSolution) {
        throw {status: 404, message: "Page not found"};
    }

    let currClass = await classModel.findOne({id: homework.class});
    let teacher = await userModel.findOne({_id: currClass.teacher});
    if (teacher.email != email) {
        throw {status: 403, message: "Forbidden"};
    }

    return {
        homeworkId: homeworkId,
        studentId: studentId,
        sourceCode: homeworkSolution.sourceCode
    }
}

async function getSolutionByRole(req, role, email, problemId) {
    if (role === config.STUDENT_ROLE) {
        return getSolutionForStudent(req, email, problemId);
    }
    else if (role === config.TEACHER_ROLE) {
        return getSolutionForTeacher(req, email, problemId);
    }
    return undefined;
}

// /problem/{id}?homework={id}
const handleProblemView = (req, res) => {
    const problemId = extractId(req.url);
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);

        let problem = await problemModel.findOne({id: problemId});
        let err;
        if (!problem) {
            err = {
                status: 404,
                message: "Problem not found"
            };
            throw err;
        }
        let ratingProblem = 0;

        if (problem.rating.length > 0) {
            ratingProblem = problem.rating.reduce((accumulator, object) => {
                return accumulator + object.rating;
            }, 0) / problem.rating.length;
        }

        let rating = {problem: ratingProblem};

        let email = extractEmailFromJwt(req);
        let user = await UserRepository.getUser({email: email});
        let username = user.username;
        let ratingValue = 0;
        if(problem.rating.some(item => item.user.equals(user._id))) {
            let indexRating = problem.rating.findIndex(item => item.user.equals(user._id));
            ratingValue = problem.rating[indexRating].rating;
        }

        let role = extractRoleFromJwt(req);

        //ca sa afisez dropdownul cu teme
        let homeworks = await getHomeworksByRole(role, email, problemId);
        
        //ca sa pe pagina informatiile pentru tema selectata din dropdown
        let solution = await getSolutionByRole(req, role, email, problemId);

        return ejs.render(htmlTemplate, {
            ratingValue: ratingValue,
            comments: problem.comments,
            username: username,
            code: {source: 'cout << "hello world"; \n cout << "ok"; '},
            problem: problem,
            rating: rating,
            homeworks: homeworks,
            solution: solution
        });
    });
}

module.exports = handleProblemView;
