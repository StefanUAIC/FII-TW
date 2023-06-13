const getFileContent = require("../util/getFileContent.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewByRole() {
    //"./view/templates/classes-teacher.ejs"
    return "./view/templates/classes-student.ejs";
}

const handleClasslistView = (req, res) => {

    //TODO get the classes data from the database
    const VIEW_PATH = getViewByRole();
    
    getFileContent(VIEW_PATH)
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

module.exports = handleClasslistView;