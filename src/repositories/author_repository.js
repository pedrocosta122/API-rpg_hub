import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

class AuthorRepository {
    static async create(authorData) {
        await db.read();

        const newAuthor = {
            id: uuidv4(),
            name: authorData.name
        }

        db.data.authors.push(newAuthor);
        await db.write();

        return newAuthor;
    }

    static async listAll() {
        await db.read();
        
        return db.data.authors;
    }

    static async getById(id) {
        await db.read();

        return db.data.authors.find(author => author.id === id);
    }

    static async update(id, updateData) {
        await db.read();

        const index = db.data.authors.find(author => author.id ===id);

        if(!index) {
            return null
        };

        db.data.authors[index] = {
            ...db.data.authors[index],
            ...updateData,
            id: id
        };

        await db.write();

        return db.data.authors[index];
    }

    static async delete(id) {
        await db.read();

        const originalLength = db.data.authors.length;

        db.data.authors = db.data.authors.filter(author => author.id !== id);

        if(db.data.authors.length === originalLength){
            return false;
        }

        await db.write();

        return true;
    }
};

export default AuthorRepository;