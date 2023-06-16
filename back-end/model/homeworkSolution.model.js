const mongoose = require("mongoose");

const homeworkSolutionSchema = new mongoose.Schema({
    id: Number,
    homework: Number, //the homework custom id
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sourceCode: {
        type: String,
        default: ''
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
        default: 'Nealocat'
    } // "nealocat", "in lucru", "trimis", "corectat"
});

module.exports = mongoose.model("HomeworkSolution", homeworkSolutionSchema);
