const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewByRole() {
    //"./view/templates/myAccount-teacher.ejs"
    return "./view/templates/myAccount-student.ejs";
}

const handleAccountView = (req, res) => {
    viewProcessor(req, res, getViewByRole(), (htmlTemplate) => {
        //TODO get data from the database
        return htmlTemplate;
    });
}

module.exports = handleAccountView;