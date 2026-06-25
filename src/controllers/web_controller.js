import BookService from "../services/book_service.js";

class WebController {
    static async renderPublicCatalogue(req, res, next) {
        try {
            const books = await BookService.getAllBooks();

            res.render('catalogue', {
                title: 'Catálogo de RPG',
                message: 'Catálogo Global de Sistemas de RPG',
                books: books 
            });
        } catch(error) {
            next(error);
        }
    }
}

export default WebController;