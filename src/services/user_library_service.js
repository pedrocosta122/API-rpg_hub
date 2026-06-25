import UserLibraryRepository from '../repositories/user_library_repository.js';
import BookRepository from '../repositories/book_repository.js';

class UserLibraryService {
    static async addBookToLibrary (libraryData, currentUser) {
        const bookExists = await BookRepository.getById(libraryData.bookId);

        if(!bookExists) {
            const error = new Error('Livro não encontrado');

            error.statusCode = 404;
            throw error;
        }

        const alreadyInLibrary = await UserLibraryRepository.getByUserAndBook(currentUser.id, libraryData.bookId);

        if(alreadyInLibrary) {
            const error = new Error('Este livro ja está na sua biblioteca');
            
            error.statusCode = 409;
            throw error;
        }

        const newLibraryEntry = {
            ...libraryData,
            userId: currentUser.id
        };

        return await UserLibraryRepository.create(newLibraryEntry);
    }
    
    static async getUserLibrary (currentUser) {
        const userBooks = await UserLibraryRepository.getByUserId(currentUser.id);

        return userBooks;
    }

    static async updateLibraryEntry (id, updateData, currentUser) {
        const libraryEntry = await UserLibraryRepository.getById(id);

        if(!libraryEntry) {
            const error = new Error('Registro não encontrado na sua biblioteca');

            error.statusCode = 404;
            throw error;
        }

        if(currentUser.role !== 'admin' && libraryEntry.userId.toString() !== currentUser.id.toString()) {
            const error = new Error('Acesso negado. Você só pode editar anotações da sua própria biblioteca');

            error.statusCode = 403;
            throw error;
        }

        delete updateData.userId;
        delete updateData.bookId;

        const isUpdated = await UserLibraryRepository.update(id, updateData);

        if(!isUpdated) {
            const error = new Error('Não foi possível atualizar registro.');

            error.statusCode = 400;
            throw error;
        }

        return await UserLibraryRepository.getById(id);
    }

    static async removeBookFromLibrary (id, currentUser) {
        const libraryEntry = await UserLibraryRepository.getById(id);

        if(!libraryEntry) {
            const error = new Error('Registro não encontrado na sua biblioteca.');

            error.statusCode = 404;
            throw error;
        }

        if(currentUser.role !== 'admin' && libraryEntry.userId.toString() !== currentUser.id.toString()) {
            const error = new Error('Acesso negado. Você só pode remover itens da sua própria biblioteca.');

            error.statusCode = 403;
            throw error;
        }

        const isDeleted = await UserLibraryRepository.delete(id);

        if(!isDeleted) {
            const error = new Error('Não foi possível remover o livro da biblioteca.');

            error.statusCode = 400;
            throw error;
        }
        
        return true;
    }
}

export default UserLibraryService;