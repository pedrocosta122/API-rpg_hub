import { Router } from "express";
import AuthorController from "../controllers/author_controller.js";
import { authorValidationRules } from "../validators/author_validator.js";

const router = Router();

router.get('/', AuthorController.listAll);
router.get('/:id', AuthorController.getById);

router.post('/', authorValidationRules, AuthorController.create);
router.put('/:id', authorValidationRules, AuthorController.update);

router.delete('/:id', AuthorController.delete);

export default router;