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

    getById = async (req, res) => {
        try {
            const task = await taskService.getTaskById(req.params.id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching task' });
        }
    }

    update = async (req, res) => {
        try {
            const task = await taskService.updateTask(req.params.id, req.body);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.json(task);
        } catch (error) {
            res.status(500).json({ message: 'Error updating task' });
        }
    }

    delete = async (req, res) => {
        try {
            const task = await taskService.deleteTask(req.params.id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting task' });
        }
    }
}
