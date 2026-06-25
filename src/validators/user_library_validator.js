import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const libraryValidationRules = [
    body('bookId')
        .notEmpty().withMessage("O ID do livro é necessário")
        .isMongoId().withMessage("Formato de ID inválido"),

    body('bookLink')
        .optional()
        .isURL().withMessage("O link para o livro deve ser uma URL válida"),

    verifyErrors
];