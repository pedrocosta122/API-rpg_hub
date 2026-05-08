import ReadingService from "../services/reading_service.js";

class ReadingController {
    static async create(req, res, next) {
        try {
            const createReadingData = req.body;
            const newReadingDto = await ReadingService.createReading(createReadingData);

            res.status(201).json(newReadingDto);
        } catch(error) {
            next(error);
        }
    }

    static async listAll(req, res, next) {
        try {
            const readings = await ReadingService.listAllReadings();

            res.status(200).json(readings);
        } catch(error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const readingDto = await ReadingService.getReadingById(id);

            res.status(200).json(readingDto);
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedDto = await ReadingService.updateReading(id, updateData);

            res.status(200).json(updatedDto);
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            await ReadingService.deleteReading(id);

            res.status(204).send();
        } catch(error) {
            next(error);
        }
    }
}

export default ReadingController;