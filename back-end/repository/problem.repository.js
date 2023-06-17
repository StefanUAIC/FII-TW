const ProblemModel = require("../model/problem.model");
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException
} = require("../exception/database.exception");

class ProblemRepository {
    getAllProblems = async (params = {}) => {
        let problemList = await ProblemModel.find(params);
        problemList = problemList.map(user => {
            return user;
        });

        return problemList;
    };

    getProblem = async (params) => {
        const problem = await ProblemModel.findOne(params);
        if (!problem) {
            throw new NotFoundException("Problem not found");
        }

        return problem;
    };

    addRatingProblem = async (content, problemId) => {
        let problem = await this.getProblem({id: problemId});

        if(!problem.rating.some(item => item.user.equals(content.user))) {
            problem.rating.push(content);
        }
        else {
            let indexRating = problem.rating.findIndex(item => item.user.equals(content.user));
            problem.rating[indexRating] = content;
        }
        await this.updateProblem({id: problemId}, problem);

        return problem;
    };

    addCommentProblem = async (content, problemId) => {
        const problem = await this.getProblem({id: problemId});
        problem.comments.push(content);
        await this.updateProblem({id: problemId}, problem);

        return problem;
    };

    createProblem = async (body) => {
        const problem = await ProblemModel.create(body);
        if (!problem) {
            throw new CreateFailedException("Problem failed to be created");
        }

        return problem;
    };

    updateProblem = async (filters, body) => {
        const result = await ProblemModel.updateOne(filters, body);
        if (!result.modifiedCount) {
            throw new UpdateFailedException("Problem update failed");
        }

        return this.getProblem(filters);
    };

    deleteProblem = async (id) => {
        const result = await ProblemModel.deleteOne(id);
        if (!result.deletedCount) {
            throw new NotFoundException("Problem not found");
        }

        return {};
    };
}

module.exports = new ProblemRepository;
