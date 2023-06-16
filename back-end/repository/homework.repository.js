const HomeworkModel = require("../model/homework.model");
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException
} = require("../exception/database.exception");

class HomeworkRepository {
    getAllHomeworks = async (params = {}) => {
        let userList = await HomeworkModel.find(params);
        userList = userList.map(user => {
            return user;
        });

        return userList;
    };

    getHomework = async (params) => {
        const user = await HomeworkModel.findOne(params);
        if (!user) {
            throw new NotFoundException("Homework not found");
        }

        return user;
    };

    createHomework = async (body) => {
        const user = await HomeworkModel.create(body);
        if (!user) {
            throw new CreateFailedException("Homework failed to be created");
        }

        return user;
    };

    updateHomework = async (filters, body) => {
        const result = await HomeworkModel.updateOne(filters, body);
        if (!result.modifiedCount) {
            throw new UpdateFailedException("Homework update failed");
        }

        return this.getHomework(filters);
    };

    deleteHomework = async (id) => {
        const result = await HomeworkModel.deleteOne(id);
        if (!result.deletedCount) {
            throw new NotFoundException("Homework not found");
        }

        return {};
    };
}

module.exports = new HomeworkRepository;
