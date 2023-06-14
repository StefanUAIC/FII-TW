const bcrypt = require("bcryptjs");

exports.hashPassword = async (body) => {
    if (body.password) {
        body.password = await bcrypt.hash(body.password, 8);
    }
};
