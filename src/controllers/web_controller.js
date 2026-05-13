import BookService from "../services/book_service.js";
import AuthorService from "../services/author_service.js";
import ReadingService from "../services/reading_service.js";
import BookDTO from "../dtos/book_dto.js";

class WebController {
    static async renderBookshelf(req, res, next) {
        try {
            const books = await BookService.listAllBooks();
            const authors = await AuthorService.listAllAuthors();
            const readings = await ReadingService.listAllReadings();

            const booksDto = books.map(book =>{
                const reading = readings.find(r => r.bookId === book.id);
                const author = authors.find(a => a.id === book.authorId);

                return new BookDTO(book, author, reading);
            });

            res.render('bookshelf', {
                books: booksDto,
                authors: authors,
                title: 'My Bookshelf',
                message: 'My Bookshelf!',
                noBooks: 'No books in the shelf yet'   
            });
        } catch(error) {
            next(error);
        }
    }
}

export default WebController;