import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const userValidationRules = [
    body('name')
        .notEmpty().withMessage("Insert user name.")
        .isLength({min: 3}).withMessage("Min. 3 characters"),
    
    verifyErrors
];