import AuthorRepository from "../repositories/author_repository.js";

class AuthorService {
    static async createAuthor(authorData) {
        const newAuthor = await AuthorRepository.create(authorData);

        return newAuthor;
    }

    static async getAllAuthors() {
        const authors = await AuthorRepository.getAll();

        return authors;
    }

    static async getAuthorById(id) {
        const author = await AuthorRepository.getById(id);

        return author;
    }

    static async updateAuthor(id, updateData) {
        const updatedAuthor = await AuthorRepository.update(id, updateData);

        return updatedAuthor;
    }

    static async deleteAuthor(id) {
        const isDeleted = await AuthorRepository.delete(id);

        if (!isDeleted) {
            const error = new Error('Unable to delete, author not found.');
            error.statusCode = 404;
            throw error;
        }

        return true;
    }
}

export default AuthorService;