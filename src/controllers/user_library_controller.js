import UserLibraryService from '../services/user_library_service.js';
import UserLibraryDTO from '../dtos/user_library_dto.js';

class UserLibraryController {
    static async create (req, res, next) {
        try {
            const libraryData = req.body;
            const currentUser = req.user;

            const newEntry = await UserLibraryService.addBookToLibrary(libraryData, currentUser);

            res.status(201).json(new UserLibraryDTO(newEntry));
        } catch (error) {
            next(error);
        }
    }

    static async getByUser (req, res, next) {
        try {
            const currentUser = req.user;

            const userBooks = await UserLibraryService.getUserLibrary(currentUser);

            const userBooksDTO = userBooks.map(entry => new UserLibraryDTO(entry));

            res.status(200).json(userBooksDTO);
        } catch (error) {
            next(error);
        }
    }

    static async update (req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const currentUser = req.user;

            const updatedEntry = await UserLibraryService.updateLibraryEntry(id, updateData, currentUser);

            res.status(200).json(new UserLibraryDTO(updatedEntry));
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const currentUser = req.user;
        
            await UserLibraryService.removeBookFromLibrary(id, currentUser);

            res.status(204).send()
        } catch (error) {
            next(error);
        }
    }
}

export default UserLibraryController;