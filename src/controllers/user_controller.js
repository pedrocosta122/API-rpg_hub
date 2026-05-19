import UserService from "../services/user_service.js";

class UserController {
    static async create(req, res, next) {
        try {
            const createUserData = req.body;
            const newUserDto = await UserService.createUser(createUserData);

            res.status(201).json(newUserDto);
        } catch(error) {
            next(error);
        }
    }

    static async listAll(req, res, next) {
        try {
            const users = await UserService.listAllUsers();

            res.status(200).json(users);
        } catch(error) {
            next(error);
        }
    }
    
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            res.status(200).json(user);
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updateDto = UserService.updateUser(id, updateData);

            res.status(200).json(updateDto);
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            await UserService.deleteUser(id);

            res.status(204).send();
        } catch(error) {
            next(error);
        }
    }
};

export default UserController;