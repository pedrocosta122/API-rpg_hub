import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const bookValidationRules = [
    body('title')
        .notEmpty().withMessage("Insert book title."),
    
    verifyErrors
];