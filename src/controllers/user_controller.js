import UserService from '../services/user_service.js';
import UserDTO from '../dtos/user_dto.js';

class UserController {
    static async create(req, res, next) {
        try {
            const createUserData = req.body;
            const newUser = await UserService.register(createUserData);

            res.status(201).json(new UserDTO(newUser));
        } catch(error) {
            next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            const users = await UserService.getAllUsers();

            const usersDTO = users.map(user => new UserDTO(user));

            res.status(200).json(usersDTO);
        } catch(error) {
            next(error);
        }
    }
    
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);

            res.status(200).json(new UserDTO(user));
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const currentUser = req.user;

            if(currentUser.role !== 'admin' && currentUser.id.toString() !== id) {
                const error = new Error('Acesso negado. Você só pode atualizar seus próprios dados.');

                error.statusCode = 403;
                throw error;
            }

            const updatedUser = await UserService.updateUser(id, updateData);

            res.status(200).json(new UserDTO(updatedUser));
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const currentUser = req.user;

            if(currentUser.role !== 'admin' && currentUser.id.toString() !== id) {
                const error = new Error('Acesso negado. Você só pode deletar sua própria conta.');

                error.statusCode = 403;
                throw error;
            }

            await UserService.deleteUser(id);

            res.status(204).send();
        } catch(error) {
            next(error);
        }
    }
};

export default UserController;