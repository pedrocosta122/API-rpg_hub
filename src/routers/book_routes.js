import { Router } from 'express';

import BookController from '../controllers/book_controller.js';

import { bookValidationRules } from '../validators/book_validator.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import checkRole from '../middlewares/permission_middleware.js';


const router = Router();

router.get('/', BookController.getAll);
router.get('/:id', BookController.getById);

router.post('/', authMiddleware, bookValidationRules , BookController.create);
router.put('/:id', authMiddleware, BookController.update);
router.delete('/:id', authMiddleware, BookController.delete);

export default router;