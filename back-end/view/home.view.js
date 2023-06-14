const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewPath() {
    //"./view/templates/home-teacher.ejs"
    return "./view/templates/home-student.ejs";
}

const handleHomeView = (req, res) => {
    viewProcessor(req, res, getViewPath(), (htmlTemplate) => {
        const userData = {
            name: "Dummy_user"
        }
        let modifiedTemplate = ejs.render(htmlTemplate, {user: userData});
        return modifiedTemplate;
    });
}

module.exports = handleHomeView;