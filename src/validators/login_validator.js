import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const loginValidationRules = [
    body('email')
        .notEmpty().withMessage("Insira o e-mail")
        .isEmail().withMessage("Insira um e-mail válido")
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage("Insira a senha")
        .isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 caracteres"),
    
    verifyErrors
];