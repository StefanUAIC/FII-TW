const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewByRole() {
    //"./view/templates/problem-selector-teacher.ejs"
    return "./view/templates/problem-selector-student.ejs";
}

const handleProblemlistView = (req, res) => {
    //TODO get the problem list data from the database
    viewProcessor(req, res, getViewByRole(), (htmlTemplate) => {
        let modifiedTemplate = htmlTemplate;
        return modifiedTemplate;
    });
}

module.exports = handleProblemlistView;