import { body } from "express-validator";
import { verifyErrors } from "../middlewares/validator_middleware.js";

export const userValidationRules = [
    body('name')
        .notEmpty().withMessage("Insira o nome de usuário")
        .isLength({min: 3}).withMessage("O nome de usuário deve ter no mínimo 3 caracteres"),

    body('email')
        .notEmpty().withMessage("Insira o e-mail")
        .isEmail().withMessage("Insira um e-mail válido")
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage("Insira a senha")
        .isLength({ min: 6 }).withMessage("A senha deve ter no mínimo 6 caracteres"),
    
    verifyErrors
];