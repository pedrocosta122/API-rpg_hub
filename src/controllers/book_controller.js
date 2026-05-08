import BookService from "../services/book_service.js";

class BookController {
    static async create(req, res, next) {
        try {
            const createBookData = req.body;
            const newBookDto = await BookService.createBook(createBookData);
            
            res.status(201).json(newBookDto);
        } catch(error) {
            next(error);
        }
    }

    static async listAll(req, res, next) {
        try {
            const books = await BookService.listAllBooks();

            res.status(200).json(books);
        } catch(error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const bookDto = await BookService.getBookById(id);

            res.status(200).json(bookDto);
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updateDto = await BookService.updateBook(id, updateData);

            res.status(200).json(updateDto);
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            await BookService.deleteBook(id);

            res.status(204).send(); // No Content
        } catch(error) {
            next(error);
        }
    }
}

export default BookController;