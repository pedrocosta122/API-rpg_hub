import { getDB } from '../config/database.js';
import { ObjectId, ReturnDocument } from 'mongodb';

class BookRepository {
    static async create(bookData){
        const db = getDB();
        const collection = db.collection('books');

        const newBook = {
            title: bookData.title,
            publisher: bookData.publisher,
            year: bookData.year,
            userId: bookData.userId
        };

        const result = await collection.insertOne(newBook);

        return { id: result.insertedId.toString(), ...newBook };
    }

    static async getAll(){
        const db = getDB();
        const collection = db.collection('books');

        const books = await collection.find().toArray();

        return books.map(({ _id, ...rest }) => ({
            id: _id.toString(),
            ...rest
        }));
    }

    static async getById(id){
        const db = getDB();
        const collection = db.collection('books');

        if(!ObjectId.isValid(id)) return null;

        const book = await collection.findOne({ _id: new ObjectId(id) });

        return book ? { id: book._id.toString(), ...book } : null;
    }

    static async update(id, updateData){
        if(!ObjectId.isValid(id)) return null;

        const db = getDB();
        const collection = db.collection('books');

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        const updatedBook = await collection.findOne({ _id: new ObjectId(id) });

        return updatedBook;
    }

    static async delete(id){
        if(!ObjectId.isValid(id)) return null;
        
        const db = getDB();
        const collection = db.collection('books');

        const result = await collection.deleteOne({ _id: new ObjectId(id)});

        return result.deletedCount === 1;
    }
}

export default BookRepository;