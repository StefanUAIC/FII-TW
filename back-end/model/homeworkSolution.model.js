const mongoose = require("mongoose");

const homeworkSolutionSchema = new mongoose.Schema({
    homework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sourceCode: String,
    description: String,
    grade: Number,

    status: String // "in lucru", "trimis", "corectat"
});

module.exports = mongoose.model("HomeworkSolution", homeworkSolutionSchema);
