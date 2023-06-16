const ProblemModel = require("../model/problem.model");
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException
} = require("../exception/database.exception");

class ProblemRepository {
    getAllProblems = async (params = {}) => {
        let userList = await ProblemModel.find(params);
        userList = userList.map(user => {
            return user;
        });

        return userList;
    };

    getProblem = async (params) => {
        const user = await ProblemModel.findOne(params);
        if (!user) {
            throw new NotFoundException("Problem not found");
        }

        return user;
    };

    createProblem = async (body) => {
        const user = await ProblemModel.create(body);
        if (!user) {
            throw new CreateFailedException("Problem failed to be created");
        }

        return user;
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
