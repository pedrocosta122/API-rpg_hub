import { Router } from 'express';
import ReadingController from '../controllers/reading_controller.js';
import { readingValidationRules } from '../validators/reading_validator.js';

const router = Router();

router.get('/', ReadingController.listAll);
router.get('/:id', ReadingController.getById);

router.post('/', readingValidationRules, ReadingController.create);
router.put('/:id', ReadingController.update);

router.delete('/:id', ReadingController.delete);

export default router;