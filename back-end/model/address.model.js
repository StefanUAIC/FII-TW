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

module.exports = mongoose.model("Address", addressSchema);
