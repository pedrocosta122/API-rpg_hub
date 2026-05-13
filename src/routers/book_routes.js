import { Router } from 'express';
import BookController from '../controllers/book_controller.js';
import { bookValidationRules } from '../validators/book_validator.js';
import WebController from '../controllers/web_controller.js';

const router = Router();

router.get('/bookshelf', WebController.renderBookshelf);

router.get('/', BookController.listAll);
router.get('/:id', BookController.getById);

router.post('/', bookValidationRules , BookController.create);
router.put('/:id', bookValidationRules, BookController.update);

router.delete('/:id', BookController.delete);

export default router;