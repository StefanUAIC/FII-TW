const {validateJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const { extractRoleFromJwt, extractEmailFromJwt } = require("../util/auth.util");
const userModel = require("../model/user.model");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/classes-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/classes-teacher.ejs";
    }
    return undefined;
}

async function getClassesByUser(user) {
    const classModel = require("../model/class.model");
    if (user.role === config.STUDENT_ROLE) {
        return classModel.find({students: {$in: [user._id]}});
    }
    else if (user.role === config.TEACHER_ROLE) {
        return classModel.find({teacher: user._id});
    }
    return undefined;
}

const handleClasslistView = (req, res) => {
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);

        let email = extractEmailFromJwt(req);
        let user = await userModel.findOne({email: email});
        let classes = await getClassesByUser(user);
        for (let i = 0; i < classes.length; i++) {
            classes[i].url = "/class/" + classes[i].id;
        }

        return ejs.render(htmlTemplate, {user: user, classes: classes});
    });
}

module.exports = handleClasslistView;