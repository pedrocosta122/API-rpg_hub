import { Router } from "express";

import AuthorController from "../controllers/author_controller.js";
import { authorValidationRules } from "../validators/author_validator.js";
import authMiddleware from "../middlewares/auth_middleware.js";

const router = Router();

router.get('/', AuthorController.getAll);
router.get('/:id', AuthorController.getById);

router.post('/', authMiddleware, authorValidationRules, AuthorController.create);
router.put('/:id', authMiddleware, authorValidationRules, AuthorController.update);

router.delete('/:id', AuthorController.delete);

export default router;