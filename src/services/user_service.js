import UserRepository from "../repositories/user_repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class UserService {
    static async register(userData) {
        const existingUser = await UserRepository.getByEmail(userData.email);

        if(existingUser) {
            const error = new Error('Este email já está em uso.');

            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const userToCreate = {
            ...userData,
            password: hashedPassword
        }

        const newUser = await UserRepository.create(userToCreate);

        return newUser;
    }

    static async login(email, password) {
        const user = await UserRepository.getByEmail(email);

        if(!user) {
            const error = new Error('E-mail ou senha incorretos.');

            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const error = new Error('E-mail ou senha incorretos.');

            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            token,
            user: { id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
        };
    }

    static async getAllUsers() {
        const users = await UserRepository.getAll();

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