const mongoose = require("mongoose");
const config = require("../config/config").config;

const homeworkSolutionSchema = new mongoose.Schema({
    // id: Number,
     homework: Number, //the homework custom id
     student: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
     },
     sendDate: {
         type: String,
         default: '-'
     },
     sourceCode: {
         type: String,
         default: config.DEFAULT_SOURCE_CODE
     },
     description: {
         type: String,
         default: 'Această temă nu a fost corectată incă.'
     },
     grade: {
         type: Number,
         default: 0
     },
 
     status: {
         type: String,
         default: config.HW_STATUS.IN_PROGRESS
     } // "in lucru", "trimis", "corectat", "inactiv"
 });

module.exports = mongoose.model("HomeworkSolution", homeworkSolutionSchema);
