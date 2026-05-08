import ReadingRepository from "../repositories/reading_repository.js";

class ReadingService {
    static async createReading(readingData) {
        const newReading = await ReadingRepository.create(readingData);

        return newReading;
    }

    static async listAllReadings() {
        const readings = await ReadingRepository.listAll();

        return readings;
    }

    static async getReadingById(id) {
        const reading = await ReadingRepository.getById(id);

        if(!reading) {
            const error = new Error('Reading not found.');
            error.statusCode = 404; 
            throw error;
        }

        return reading;
    }

    static async updateReading(id, updateData) {
        const updatedReading = await ReadingRepository.update(id, updateData);

        if(!updatedReading) {
            const error = new Error('Reading not found.');
            error.statusCode = 404; 
            throw error;
        }

        return updatedReading;
    }

    static async deleteReading(id) {
        const isDeleted = await ReadingRepository.delete(id);

        if (!isDeleted) {
            const error = new Error('Unable to delete, reading not found.');
            error.statusCode = 404;
            throw error;
        }

        return true;
    }
}

export default ReadingService;