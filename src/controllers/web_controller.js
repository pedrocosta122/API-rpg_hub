import BookService from "../services/book_service.js";

class WebController {
    static async renderBookshelf(req, res, next) {
        try {
            const books = await BookService.listAllBooks();

            res.render('bookshelf', {books: books});
        } catch(error) {
            next(error);
        }
    }
}

export default WebController;