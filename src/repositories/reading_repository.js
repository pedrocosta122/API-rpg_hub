import db from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

class ReadingRepository {
    static async create(readingData) {
        await db.read();

        const newReading = {
            id: uuidv4(),
            bookId: readingData.bookId,
            currentPage: readingData.currentPage || 0,
            totalPages: readingData.totalPages || 0,
            status: readingData.status || "To Read"
       }

       db.data.readings = db.data.readings || [];
       db.data.readings.push(newReading);

       await db.write();

       return newReading;
    }

    static async listAll() {
        await db.read();

        return db.data.readings;
    }

    static async getById(id) {
        await db.read();

        return db.data.readings.find(reading => reading.id === id);
    }

    static async update(id, updateData) {
        await db.read();

        const index = db.data.readings.findIndex(reading => reading.id === id);

        if(index === -1) {
            return null;
        }

        db.data.readings[index] = {
            ...db.data.readings[index],
            ...updateData,
            id: id
        }

        await db.write();

        return db.data.readings[index];
    }

    static async delete(id) {
        await db.read();

        if(!db.data.readings) {
            return false;
        }

        const originalLength = db.data.readings.length;

        db.data.readings = db.data.readings.filter(reading => reading.id !== id);

        if(db.data.readings.length === originalLength){
            return false;
        }
    
        await db.write();

        return true;
    }

    static async deleteByBookId(bookId) {
        await db.read();

        if(!db.data.readings) {
            return;
        }

        const originalLength = db.data.readings.length;

        db.data.readings = db.data.readings.filter(reading => reading.bookId !== bookId);

        if(db.data.readings.length !== originalLength) {
            await db.write();
        }
    }
}

export default ReadingRepository;