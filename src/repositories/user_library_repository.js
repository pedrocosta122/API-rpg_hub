import { getDB } from '../config/database.js';
import { ObjectId, ReturnDocument } from 'mongodb';

class UserLibraryRepository {
    static async create(userLibraryData) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const newBook = {
            userId: new ObjectId(userLibraryData.userId),
            bookId: new ObjectId(userLibraryData.bookId),
            bookLink: userLibraryData.bookLink,
            campaignNotes: userLibraryData.campaignNotes || ''
        };

        const result = await collection.insertOne(newBook);

        return {
            id: result.insertedId.toString(),
            ...newBook
        };
    }

    static async getByUserId(userId) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const userBooks = await collection.aggregate([
            {$match: { userId: new ObjectId(userId) }},

            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },

            {
                $unwind: {
                    path: '$bookDetails',
                    preserveNullAndEmptyArrays: true
                }
            }
        ]).toArray();
        
        return userBooks;
    }

    static async getByUserAndBook(userId, bookId) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const bookInLibrary = await collection.findOne({
            userId: new ObjectId(userId),
            bookId: new ObjectId(bookId)
        });

        return bookInLibrary;
    }

    static async getById(id) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const book = await collection.findOne({ _id: new ObjectId(id) });

        return book;
    }

    static async update(id, updateData) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        return result.modifiedCount > 0;
    }

    static async delete(id) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        return result.deletedCount > 0;
    }

    static async clearLibrary(userId) {
        const db = getDB();
        const collection = db.collection('userlibrary');

        const result = await collection.deleteMany({ userId: new ObjectId(userId) });

        return true;
    }
}

export default UserLibraryRepository;