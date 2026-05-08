import BookRepository from "../repositories/book_repository.js";

class BookService {
    static async createBook (bookData) {
        const newBook = await BookRepository.create(bookData);

        return newBook;
    }

    static async listAllBooks () {
        const books = await BookRepository.listAll();

        return books;
    }

    static async getBookById (id) {
        const book = await BookRepository.getById(id);

        if(!book){
            const error = new Error('Book not found.');
            error.statusCode = 404; //Not Found
            throw error;
        }

        return book;
    }

    static async updateBook (id, updateData) {
        const updatedBook = await BookRepository.update(id, updateData);

        if(!updatedBook){
            const error = new Error('Unable to update, book not found.');
            error.statusCode = 404;
            throw error;
        }

        return updatedBook;
    }

    static async deleteBook (id) {
        const isDeleted = await BookRepository.delete(id);

        if (!isDeleted) {
            const error = new Error('Unable to delete, book not found.');
            error.statusCode = 404;
            throw error;
        }

        return true;
    }
}

export default BookService;