import BookService from "../services/book_service.js";
import BookDTO from "../dtos/book_dto.js";

class BookController {
    static async create(req, res, next) {
        try {
            const createBookData = req.body;
            const currentUser = req.user;

            const newBook = await BookService.createBook(createBookData, currentUser);
            
            res.status(201).json(new BookDTO(newBook));
        } catch(error) {
            next(error);
        }
    }

    static async getAll(req, res, next) {
        try {
            const books = await BookService.getAllBooks();

            const booksDTO = books.map(book => new BookDTO(book));

            res.status(200).json(booksDTO);
        } catch(error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await BookService.getBookById(id);

            res.status(200).json(new BookDTO(book));
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const currentUser = req.user;
            
            const updateDto = await BookService.updateBook(id, updateData, currentUser);

            res.status(200).json(new BookDTO(updateDto));
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const currentUser = req.user;
            
            await BookService.deleteBook(id, currentUser);

            res.status(204).send(); // No Content
        } catch(error) {
            next(error);
        }
    }
}

export default BookController;