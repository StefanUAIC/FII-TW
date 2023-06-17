const {validateJwt} = require("../util/auth.util");
const viewProcessor = require("../util/viewRequest.util");
const ejs = require('ejs');
const extractId = require("../util/urlParser.util").extractIdFromUrl;
const config = require("../config/config").config;
const { extractRoleFromJwt, extractEmailFromJwt } = require("../util/auth.util");
const problemModel = require("../model/problem.model");
const UserRepository = require("../repository/user.repository");

function getViewPath(req) {
    let role = extractRoleFromJwt(req);
    if (role === config.STUDENT_ROLE) {
        return "./view/templates/problem-student.ejs";
    } else if (role === config.TEACHER_ROLE) {
        return "./view/templates/problem-teacher.ejs";
    }
    return undefined;
}

const handleProblemView = (req, res) => {
    const problemId = extractId(req.url);
    viewProcessor(req, res, getViewPath(req), async (htmlTemplate) => {
        validateJwt(req);

        let problem = await problemModel.findOne({id: problemId});
        if (!problem) {
            err = {
                status: 404,
                message: "Problem not found"
            };
            throw err;
        }
        let ratingProblem = 0;

        if (problem.rating.length > 0) {
            ratingProblem = problem.rating.reduce((accumulator, object) => {
                return accumulator + object.rating;
            }, 0) / problem.rating.length;
        }

        rating = {problem: ratingProblem};

        let email = extractEmailFromJwt(req);
        let user = await UserRepository.getUser({email: email});
        let username = user.username;
        let ratingValue = 0;
        if(problem.rating.some(item => item.user.equals(user._id))) {
            let indexRating = problem.rating.findIndex(item => item.user.equals(user._id));
            ratingValue = problem.rating[indexRating].rating;
        }

        let modifiedTemplate = ejs.render(htmlTemplate, {ratingValue: ratingValue, comments: problem.comments, username: username, code: {source: 'cout << "hello world"; \n cout << "ok"; '}, problem: problem, rating: rating});
        return modifiedTemplate;
    });
}

module.exports = handleProblemView;
