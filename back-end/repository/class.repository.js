const ClassModel = require("../model/class.model");
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException
} = require("../exception/database.exception");

class ClassRepository {
    getAllClasses = async (params = {}) => {
        let userList = await ClassModel.find(params);
        userList = userList.map(user => {
            return user;
        });

        return userList;
    };

    getClass = async (params) => {
        const user = await ClassModel.findOne(params);
        if (!user) {
            throw new NotFoundException("Class not found");
        }

        return user;
    };

    createClass = async (body) => {
        const user = await ClassModel.create(body);
        if (!user) {
            throw new CreateFailedException("Class failed to be created");
        }

        return user;
    };

    updateClass = async (filters, body) => {
        const result = await ClassModel.updateOne(filters, body);
        if (!result.modifiedCount) {
            throw new UpdateFailedException("Class update failed");
        }

        return this.getClass(filters);
    };

    deleteClass = async (id) => {
        const result = await ClassModel.deleteOne(id);
        if (!result.deletedCount) {
            throw new NotFoundException("Class not found");
        }

        return {};
    };
}

module.exports = new ClassRepository;
