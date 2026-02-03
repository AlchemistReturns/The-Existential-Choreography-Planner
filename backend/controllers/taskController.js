import { TaskService } from '../services/taskService.js';

const taskService = new TaskService();

export class TaskController {
    getAll = async (req, res) => {
        try {
            const tasks = await taskService.getAllTasks();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching tasks' });
        }
    }

    create = async (req, res) => {
        try {
            const task = await taskService.addTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error creating task' });
        }
    }
}
