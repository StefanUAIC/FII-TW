const bcrypt = require("bcryptjs");


exports.comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

exports.hashPassword = async (body) => {
    if (body.password) {
        body.password = await bcrypt.hash(body.password, 8);
    }
};
