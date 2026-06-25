import { getDB } from '../config/database.js';
import { ObjectId, ReturnDocument } from 'mongodb';

import UserDTO from '../dtos/user_dto.js';

class UserRepository {
    static async create(userData) {
        const db = getDB();
        const collection = db.collection('users');

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role || 'user'
        }

        const result = await collection.insertOne(newUser);

        return {
            id: result.insertedId.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
    }

    static async getByEmail(email) {
        const db = getDB();
        const collection = db.collection('users');

        const user = await collection.findOne({ email: email });

        return user;
    }

    static async getAll() {
        const db = getDB();
        const collection = db.collection('users');

        const users = await collection.find().toArray();

        return users.map(user => new UserDTO(user));
    }

    static async getById(id) {
        const db = getDB();
        const collection = db.collection('users');

        const user = await collection.findOne({ _id: new ObjectId(id) });

        if(!user) return null;

        return new UserDTO(user);
    }

    static async update(id, updateData) {
        const db = getDB();
        const collection = db.collection('users');

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        return result.modifiedCount > 0;
    }

    static async delete(id) {
        const db = getDB();
        const collection = db.collection('users');
        
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        return result.deletedCount > 0;
    }
};

export default UserRepository;