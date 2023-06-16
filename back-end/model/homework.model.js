const mongoose = require("mongoose");

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

module.exports = mongoose.model("Homework", homeworkSchema);
