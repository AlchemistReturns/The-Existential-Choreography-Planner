import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';

const taskService = new TaskService();

export class TaskController {
    getAll = async (req: Request, res: Response) => {
        try {
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks' });
        }
    }

    create = async (req: Request, res: Response) => {
        try {
            const task = await taskService.addTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task' });
        }
    }
}
