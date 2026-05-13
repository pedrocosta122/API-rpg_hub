import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

class BookRepository {
    static async create(bookData){
        await db.read();

        const newBook = {
            id: uuidv4(),
            title: bookData.title,
            authorId: bookData.authorId,
        }

        db.data.books.push(newBook);
        await db.write();

        return newBook;
    }

    static async listAll(){
        await db.read();

        return db.data.books;
    }

    static async getById(id){
        await db.read();

        return db.data.books.find(book => book.id === id);
    }

    static async update(id, updateData){
        await db.read();

        const index = db.data.books.findIndex(book => book.id === id);

        if (index === -1){
            return null;
        }

        db.data.books[index] = {
            ...db.data.books[index],
            ...updateData,
            id: id
        }

        await db.write();

        return db.data.books[index];
    }

    static async delete(id){
        await db.read();

        const originalLength = db.data.books.length;

        db.data.books = db.data.books.filter(book => book.id !== id);

        if(db.data.books.length === originalLength){
            return false;
        }

        await db.write();

        return true;
    }
}

export default BookRepository;