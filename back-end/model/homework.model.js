const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    id: Number,
    title: String,

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

module.exports = mongoose.model("Homework", homeworkSchema);
