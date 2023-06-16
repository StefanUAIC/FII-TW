const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    id: Number,
    name: String,
    code: String,
    description: String,
    homework: {
        type: Number, //the homework custom id
        default: 0
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const homeworkSolutionSchema = new mongoose.Schema({
    id: Number,
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
        default: 'In lucru'
    } // "in lucru", "trimis", "corectat"
});

const homeworkSchema = new mongoose.Schema({
    id: Number,
    title: String,
    deadline: Date,

    problem: Number, //the problem custom id
    class: Number, //the class custom id
});

const commentSchema = new mongoose.Schema({
    username: String,
    date: Date,
    content: {
        type: String,
        maxLength: 200
    }
});

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
});

const problemSchema = new mongoose.Schema({
    id: Number,
    title: String,

    description: String,
    input: String,
    output: String,
    restrictions: String,

    difficulty: String,
    chapter: String,
    author: String,
    grade: String, //clasa

    tags: [String],
    rating: [ratingSchema],
    comments: [commentSchema]
});

let classModel = mongoose.model("Class", classSchema);
let homeworkModel = mongoose.model("Homework", homeworkSchema);
let homeworkSolutionModel = mongoose.model("HomeworkSolution", homeworkSolutionSchema);
let problemModel = mongoose.model("Problem", problemSchema);

module.exports = { classModel, homeworkModel, homeworkSolutionModel, problemModel };