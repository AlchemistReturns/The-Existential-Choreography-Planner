import { ITask } from '../models/task';
import { TaskRepository } from '../repositories/taskRepository';

export class TaskService {
    private repository: TaskRepository;

    constructor() {
        this.repository = new TaskRepository();
    }

    async getAllTasks(): Promise<ITask[]> {
        return await this.repository.getAll();
    }

    async addTask(data: any): Promise<ITask> {
        return await this.repository.add(data);
    }
}
