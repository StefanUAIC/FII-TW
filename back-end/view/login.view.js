
const respondFile = require("../util/respondFile.util");


const handleLoginView = (req, res) => {
    respondFile(req, res, "index.html");
};

module.exports = handleLoginView;
