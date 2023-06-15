const { validateJwt } = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
let ejs = require('ejs');
const config = require("../config/config").config;
const { extractRoleFromJwt } = require("../util/auth.util");

const { problemModel } = require("../model/schemas.model");
const MAX_PROBLEM_SUMMARY_LENGTH = 140;

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/problem-selector-student.ejs";
    }
    else if (role === config.TEACHER_ROLE) {
        return "./view/templates/problem-selector-teacher.ejs";
    }
    return undefined;
}

const handleProblemlistView = (req, res) => {
    //TODO get the problem list data from the database
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);

        let problems = await problemModel.find({});
        for (let i = 0; i < problems.length; i++) {
            problems[i].url = "/problem/" + problems[i].id;
            problems[i].summary = problems[i].description.substring(0, MAX_PROBLEM_SUMMARY_LENGTH) + "...";
        }

        let modifiedTemplate = ejs.render(htmlTemplate, {problems: problems});
        return modifiedTemplate;
    });
}

module.exports = handleProblemlistView;