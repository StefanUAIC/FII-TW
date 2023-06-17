const config = require("../config/config").config;
const homeworkSolutionModel = require("../model/homeworkSolution.model");
const classModel = require("../model/class.model");

const isActiveHomework = (homeworkSolution) => {
    return homeworkSolution.status === config.HW_STATUS.IN_PROGRESS;
}

const markCurrentHomeworkStatus = async (currClass, status) => {
    let homeworkId = currClass.homework;
    if (!homeworkId) {
        return;
    }

    for (let i = 0; i < currClass.students.length; i++) {
        const studentId = currClass.students[i];
        await homeworkSolutionModel.updateOne({student: studentId, homework: homeworkId}, {$set: {status: status}});
    }
} 

const assignHomeworkToClass = async (currClass, homeworkId) => {
    //updatez id-ul temei din clasa respectiva
    await classModel.updateOne({id: currClass.id}, {$set: {homework: homeworkId}});

    //asignez tema fiecarui student din acea clasa
    for (let i = 0; i < currClass.students.length; i++) {
        const studentId = currClass.students[i];
        homeworkSolutionModel.create({student: studentId, homework: homeworkId});
    }
}

module.exports = {isActiveHomework, markCurrentHomeworkStatus, assignHomeworkToClass};