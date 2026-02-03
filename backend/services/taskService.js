import { TaskRepository } from '../repositories/taskRepository.js';

export class TaskService {
    constructor() {
        this.repository = new TaskRepository();
    }

    async getAllTasks() {
        return await this.repository.getAll();
    }

    async addTask(data) {
        return await this.repository.add(data);
    }
}
