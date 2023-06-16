const mongoose = require("mongoose");
const userSchema = require("./user.model").schema;

const classSchema = new mongoose.Schema({
    id: String,
    name: String,
    code: String,
    homework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
    teacher: userSchema,
    students: [userSchema]
});

module.exports = mongoose.model("Class", classSchema);
