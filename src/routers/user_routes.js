import { Router } from "express";
import UserController from "../controllers/user_controller.js";
import { userValidationRules } from "../validators/user_validator.js";

const router = Router();

router.get('/', UserController.listAll);
router.get('/:id', UserController.getById);

router.post('/', userValidationRules, UserController.create);
router.put('/:id', userValidationRules, UserController.update);

router.delete('/:id', UserController.delete);

export default router;