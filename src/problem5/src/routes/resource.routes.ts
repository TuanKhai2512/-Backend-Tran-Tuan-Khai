import { Router } from 'express';
import { ResourceController } from '../controllers/resource.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const resourceController = new ResourceController();

router.post('/', authMiddleware, resourceController.create);
router.get('/', authMiddleware, resourceController.findAll);
router.get('/:id', authMiddleware, resourceController.findOne);
router.put('/:id', authMiddleware, resourceController.update);
router.delete('/:id', authMiddleware, resourceController.delete);

export default router; 