const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    id: Number,
    title: String,
    deadline: Date,

    problem: Number, //the problem custom id
    class: Number, //the class custom id
});

module.exports = mongoose.model("Homework", homeworkSchema);
