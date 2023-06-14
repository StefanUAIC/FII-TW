const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewPath() {
    //"./view/templates/classes-teacher.ejs"
    return "./view/templates/classes-student.ejs";
}

const handleClasslistView = (req, res) => {
    viewProcessor(req, res, getViewPath(), (htmlTemplate) => {
        //TODO get data from the database
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
}

module.exports = handleClasslistView;