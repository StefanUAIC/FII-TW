const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        default: '-'
    },
    country: {
        type: String,
        default: '-'
    },
    state: {
        type: String,
        default: '-'
    },
    city: {
        type: String,
        default: '-'
    }
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    role: String,
    description: { type: String, default: 'Fără descriere' },
    address: { type: addressSchema, default: {} }
});

const classSchema = new mongoose.Schema({
    id: Number,
    name: String,
    code: String,
    description: String,
    homework: {
        type: Number, //the homework custom id
        ref: 'Homework',
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
    homework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
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

    status: String // "in lucru", "trimis", "corectat"
});

const homeworkSchema = new mongoose.Schema({
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Problem'
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    },
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