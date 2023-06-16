const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: String,
    date: Date,
    content: {
        type: String,
        maxLength: 200
    }
});

module.exports = mongoose.model("Comment", commentSchema);
