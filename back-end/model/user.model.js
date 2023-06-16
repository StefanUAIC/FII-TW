const mongoose = require("mongoose");
const addressSchema = require("./address.model").schema;

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    role: String,
    description: {type: String, default: 'Fără descriere'},
    address: {type: addressSchema, default: {}}
});

module.exports = mongoose.model("User", userSchema);
