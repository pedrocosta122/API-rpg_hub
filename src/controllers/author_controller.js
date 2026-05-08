import AuthorService from "../services/author_service.js";

class AuthorController {
    static async create(req, res, next) {
        try {
            const createAuthorData = req.body;
            const newAuthorDto = await AuthorService.createAuthor(createAuthorData);
            
            res.status(201).json(newAuthorDto);
        } catch(error) {
            next(error);
        }
    }

    static async listAll(req, res, next) {
        try {
            const authors = await AuthorService.listAllAuthors();

            res.status(200).json(authors);
        } catch(error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const author = await AuthorService.getAuthorById(id);

            res.status(200).json(author);
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updateDto = await AuthorService.updateAuthor(id, updateData);

            res.status(200).json(updateDto);
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try{
            const { id } = req.params;
            
            await AuthorService.deleteAuthor(id);

            res.status(204).send();
        } catch(error) {
            next(error);
        }
    }
}

export default AuthorController;