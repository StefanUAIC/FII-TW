const { hashPassword } = require("../util/hashpassword.util");

const UserModel = require("../model/user.model");
const {
    NotFoundException,
    CreateFailedException,
    UpdateFailedException
} = require("../exception/database.exception");

class UserRepository {
    getAllUsers = async (params = {}) => {
        let userList = await UserModel.find(params);

        userList = userList.map(user => {
            user.password = undefined;
            return user;
        });

        return userList;
    };

    getUser = async (params) => {
        const user = await UserModel.findOne(params);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        user.password = undefined;

        return user;
    };

    createUser = async (body) => {
        await hashPassword(body);

        const user = await UserModel.create(body);

        if (!user) {
            throw new CreateFailedException("User failed to be created");
        }

        user.password = undefined;

        return user;
    };

    updateUser = async (filters, body) => {
        const result = await UserModel.updateOne(filters, body);

        if (!result.modifiedCount) {
            throw new UpdateFailedException("User update failed");
        }

        return this.getUser(filters);
    };

    deleteUser = async (id) => {
        const result = await UserModel.deleteOne(id);
        if (!result.deletedCount) {
            throw new NotFoundException("User not found");
        }

        return {};
    };
}

module.exports = new UserRepository;
