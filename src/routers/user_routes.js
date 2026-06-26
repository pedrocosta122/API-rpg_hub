import { Router } from "express";
import UserController from "../controllers/user_controller.js";

import { userValidationRules } from "../validators/user_validator.js";
import checkRole from "../middlewares/permission_middleware.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = Router();

router.get('/', authMiddleware, checkRole('admin'), UserController.getAll);
router.get('/:id', authMiddleware, checkRole('admin'), UserController.getById);

router.post('/', userValidationRules, UserController.create);
router.put('/:id', authMiddleware, UserController.update);

router.delete('/:id', authMiddleware, UserController.delete);

export default router;