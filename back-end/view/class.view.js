const {validateJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const ejs = require('ejs');
const config = require("../config/config").config;
const { extractRoleFromJwt } = require("../util/auth.util");
const classModel = require("../model/class.model");
const homeworkSolutionModel = require("../model/homeworkSolution.model");
const homeworkModel = require("../model/homework.model");
const userModel = require("../model/user.model");
const problemModel = require("../model/problem.model");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/class-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/class-teacher.ejs";
    }
    return undefined;
}

async function buildStudentList(currClass) {
    let studentList = [];
    let homework = await homeworkModel.findOne({id: currClass.homework});

    for (let i = 0; i < currClass.students.length; i++) {
        let studentId = currClass.students[i];
        let student = await userModel.findOne({_id: studentId});

        if (currClass.homework === 0) { //nu are tema
            studentList.push({
                name: student.firstName + " " + student.lastName,
                status: "Nealocat",
                sendDate: "-",
                deadline: "-",
                problemUrl: "#",
            })
            continue;
        }

        let homeworkSolution = await homeworkSolutionModel.findOne({student: studentId, homework: currClass.homework});

        studentList.push({
            name: student.firstName + " " + student.lastName,
            status: homeworkSolution.status,
            sendDate: homeworkSolution.sendDate,
            deadline: homework.deadline.toLocaleDateString(),
            problemUrl: `/problem/${homework.problem}?homework=${homework.id}&student=${studentId}`,
        })
    }
    
    return studentList;
}

async function buildClassInfo(currClass) {
    let classInfo = {
        id: currClass.id,
        name: currClass.name,
        code: currClass.code,
        studentCount: currClass.students.length, 
        homeworkId: currClass.homework
    };

    let teacher = await userModel.findOne({_id: currClass.teacher});
    classInfo.teacher = teacher.firstName + " " + teacher.lastName;

    if (currClass.homework === 0) {
        classInfo.hasHomework = "Nu";
    }
    else {
        classInfo.hasHomework = "Da";
    }

    let homework = await homeworkModel.findOne({id: currClass.homework});
    classInfo.problemId = 0;
    if (homework) {
        classInfo.problemId = homework.problem;
    }

    return classInfo;
}

const handleClassView = (req, res) => {
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);

        const classId = extractId(req.url);
        let currClass = await classModel.findOne({id: classId});

        let studentList = await buildStudentList(currClass);
        let classInfo = await buildClassInfo(currClass);
        let problems = await problemModel.find();

        return ejs.render(htmlTemplate, {studentList: studentList, classInfo: classInfo, problems: problems});
    });
}

module.exports = handleClassView;