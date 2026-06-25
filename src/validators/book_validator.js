import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const bookValidationRules = [
    body('title')
        .notEmpty().withMessage("Insira o título do livro.")
        .isString().withMessage("Título inválido"),

    body('publisher')
        .notEmpty().withMessage("Insira a editora do livro.")
        .isString().withMessage("invalido"),

    body('year')
        .notEmpty().withMessage("Insira o ano de lançamento.")
        .isInt({ min: 1970, max: 2100}).withMessage("O ano deve ser um número válido."),
    
    verifyErrors
];