import { Router } from 'express';

import UserLibraryController from '../controllers/user_library_controller.js';

import authMiddleware from '../middlewares/auth_middleware.js';
import { libraryValidationRules } from '../validators/user_library_validator.js';

const router = Router();

router.get('/', authMiddleware, UserLibraryController.getByUser);

router.post('/', authMiddleware, libraryValidationRules, UserLibraryController.create);
router.put('/:id', authMiddleware, libraryValidationRules, UserLibraryController.update);
router.delete('/:id', authMiddleware, UserLibraryController.delete);

export default router;