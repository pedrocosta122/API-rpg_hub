import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const authorValidationRules = [
    body('name')
        .notEmpty().withMessage("Insert author's name."),

    verifyErrors
];