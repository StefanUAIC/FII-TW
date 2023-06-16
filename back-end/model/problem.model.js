const mongoose = require("mongoose");
const ratingSchema = require("./rating.model").schema;
const commentSchema = require("./comment.model").schema;

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


module.exports = mongoose.model("Problem", problemSchema);
