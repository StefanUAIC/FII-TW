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

module.exports = mongoose.model("Class", classSchema);
