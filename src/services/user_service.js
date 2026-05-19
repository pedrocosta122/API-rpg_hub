import UserRepository from "../repositories/user_repository.js";

class UserService {
    static async createUser(userData) {
        const newUser = await UserRepository.create(userData);

        return newUser;
    }

    static async listAllUsers() {
        const users = await UserRepository.listAll();

        return users;
    }

    static async getUserById(id) {
        const user = await UserRepository.getById(id);

        return user;
    }

    static async updateUser(id, updateData) {
        const updatedUser = await UserRepository.update(id, updateData);

        return updatedUser;
    }

    static async deleteUser(id) {
        const isDeleted = await UserRepository.delete(id);

        if(!isDeleted) {
            const error = new Error('Unable to delete, user not found');
            error.statusCode = 404;
            throw error;
        }

        return true;
    }
};

export default UserService;