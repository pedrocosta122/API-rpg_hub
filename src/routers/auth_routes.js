import { Router } from "express";

import AuthController from "../controllers/auth_controller.js";
import UserController from "../controllers/user_controller.js";

import { userValidationRules } from "../validators/user_validator.js";

const router = Router();

router.post('/register', userValidationRules, UserController.create);

router.post('/login', userValidationRules, AuthController.login);

export default router;