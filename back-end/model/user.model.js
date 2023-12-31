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
    description: {type: String, default: 'Fără descriere'},
    address: {type: addressSchema, default: {}}
});

module.exports = mongoose.model("User", userSchema);
