const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    country: {
        type: String,
        default: "-"
    },
    state: {
        type: String,
        default: "-"
    },
    city: {
        type: String,
        default: "-"
    }
});

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    role: String,
    description: {
        type: String,
        default: "Fara descriere"
    },
    address: {
        type: addressSchema,
        default: {}
    }
});

module.exports = mongoose.model("User", userSchema);
