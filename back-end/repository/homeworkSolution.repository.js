const HomeworkSolutionModel = require("../model/homeworkSolution.model");
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException
} = require("../exception/database.exception");

class HomeworkSolutionRepository {
    getAllHomeworkSolutions = async (params = {}) => {
        let userList = await HomeworkSolutionModel.find(params);
        userList = userList.map(user => {
            return user;
        });

        return userList;
    };

    getHomeworkSolution = async (params) => {
        const user = await HomeworkSolutionModel.findOne(params);
        if (!user) {
            throw new NotFoundException("HomeworkSolution not found");
        }

        return user;
    };

    createHomeworkSolution = async (body) => {
        const user = await HomeworkSolutionModel.create(body);
        if (!user) {
            throw new CreateFailedException("HomeworkSolution failed to be created");
        }

        return user;
    };

    updateHomeworkSolution = async (filters, body) => {
        const result = await HomeworkSolutionModel.updateOne(filters, body);
        if (!result.modifiedCount) {
            throw new UpdateFailedException("HomeworkSolution update failed");
        }

        return this.getHomeworkSolution(filters);
    };

    deleteHomeworkSolution = async (id) => {
        const result = await HomeworkSolutionModel.deleteOne(id);
        if (!result.deletedCount) {
            throw new NotFoundException("HomeworkSolution not found");
        }

        return {};
    };
}

module.exports = new HomeworkSolutionRepository;
