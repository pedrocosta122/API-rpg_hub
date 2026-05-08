import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const readingValidationRules = [
    body('bookId')
        .notEmpty().withMessage("Insert the book ID")
        .isUUID().withMessage("The ID needs to be an UUID"),
    
    verifyErrors
];