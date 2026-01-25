import { Router } from 'express';
import { TaskController } from '../controllers/taskController';

const router = Router();
const taskController = new TaskController();

router.get('/', taskController.getAll);
router.post('/', taskController.create);

export default router;
