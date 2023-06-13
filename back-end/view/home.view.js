const getFileContent = require("../util/getFileContent.util");
let ejs = require('ejs');

//TODO ADD ROLES based on authenticated user type
function getViewByRole() {
    //"./view/templates/home-teacher.ejs"
    return "./view/templates/home-student.ejs";
}

const handleHomeView = (req, res) => {

    //TODO Get the user NAME from the request object
    const userData = {
        name: "Dummy_user"
    }
    const HOME_VIEW_PATH = getViewByRole();
    
    getFileContent(HOME_VIEW_PATH)
        .then((data) => {
            let html = ejs.render(data, {user: userData});
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        })
        .catch((err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(err.message);
        });
}

module.exports = handleHomeView;