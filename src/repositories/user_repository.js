import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

class UserRepository {
    static async create(userData) {
        await db.read();

        const newUser = {
            id: uuidv4(),
            name: userData.name,
            email: userData.email,
            password: userData.password
        }

        db.data.users.push(newUser);
        await db.write();

        return newUser;
    }

    static async listAll() {
        await db.read();

        return db.data.users;
    }

    static async getById(id) {
        await db.read();

        return db.data.users.find(user => user.id === id);
    }

    static async update(id, updateData) {
        await db.read();

        const index = db.data.users.find(user => user.id === id);

        if(!index) {
            return null
        }

        db.data.users[index] = {
            ...db.data.users[index],
            ...updateData,
            id: id
        };

        await db.write();

        return db.data.users[index];
    }

    static async delete(id) {
        await db.read;

        const originalLength = db.data.users.length;

        db.data.users = db.data.users.filter(user => user.id !== id);

        if(db.data.users.length === originalLength) {
            return false;
        }

        await db.write();

        return true;
    }
};

export default UserRepository;