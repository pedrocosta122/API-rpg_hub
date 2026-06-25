import BookRepository from "../repositories/book_repository.js";

class BookService {
    static async createBook (bookData, currentUser) {
        const bookWithOwner = {
            ...bookData,
            userId: currentUser.id
        }
        const newBook = await BookRepository.create(bookWithOwner);

        return newBook;
    }

    static async getAllBooks () {
        const books = await BookRepository.getAll();

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

    static async updateBook (id, updateData, currentUser) {
        const book = await BookRepository.getById(id);

        if(!book) {
            const error = new Error('Livro não encontrado');
            error.statusCode = 404;
            throw error;
        }

        if(currentUser.role !== 'admin' && book.userId.toString() !== currentUser.id.toString()) {
            const error = new Error('Acesso negado. Apenas o dono ou um administrador pode alterar um livro')
            error.statusCode = 403;
            throw error;
        }

        const updatedBook = await BookRepository.update(id, updateData);

        if(!updatedBook){
            const error = new Error('Unable to update, book not found.');
            error.statusCode = 404;
            throw error;
        }

        return updatedBook;
    }

    static async deleteBook (id, currentUser) {
        const book = await BookRepository.getById(id);

        if(!book) {
            const error = new Error('Livro não encontrado');
            error.statusCode = 404;
            throw error;
        }

        if(currentUser.role !== 'admin') {
            if(!book.userId || book.userId.toString() !== currentUser.id.toString()) {
                const error = new Error('Acesso negado. Apenas o dono ou um administrador pode alterar este livro.');
                error.statusCode = 403;
                throw error;
            }
        } 

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