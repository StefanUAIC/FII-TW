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
    id: String,
    name: String,
    code: String,
    homework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework',
        default: 0
    },
    teacher: userSchema,
    students: [userSchema]
});

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
    title: String,

    description: String,
    input: String,
    output: String,
    restrictions: String,

    difficulty: String,
    chapter: String,
    author: String,
    grade: String, //clasa

    rating: [ratingSchema],
    comments: [commentSchema]
});

let userModel = mongoose.model("User", userSchema);
let classModel = mongoose.model("Class", classSchema);
let homeworkModel = mongoose.model("Homework", homeworkSchema);
let homeworkSolutionModel = mongoose.model("HomeworkSolution", homeworkSolutionSchema);
let problemModel = mongoose.model("Problem", problemSchema);

module.exports = { userModel, classModel, homeworkModel, homeworkSolutionModel, problemModel };