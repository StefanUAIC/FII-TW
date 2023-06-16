const mongoose = require("mongoose");

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


module.exports = mongoose.model("Problem", problemSchema);
