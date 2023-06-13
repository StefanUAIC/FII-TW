const getFileContent = require("../util/getFileContent.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewByRole() {
    //"./view/templates/myAccount-teacher.ejs"
    return "./view/templates/myAccount-student.ejs";
}

const handleAccountView = (req, res) => {

    //TODO get data from the database
    const HOME_VIEW_PATH = getViewByRole();
    
    getFileContent(HOME_VIEW_PATH)
        .then((data) => {
            let html = ejs.render(data);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        })
        .catch((err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err.message);
        });
}

module.exports = handleAccountView;