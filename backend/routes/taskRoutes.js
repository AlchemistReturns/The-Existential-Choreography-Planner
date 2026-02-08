import { Router } from 'express';
import { TaskController } from '../controllers/taskController.js';

const router = Router();
const taskController = new TaskController();

router.get('/', taskController.getAll);
router.post('/', taskController.create);
router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;
