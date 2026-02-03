import { Task } from '../models/task.js';

export class TaskRepository {
    async getAll() {
        return await Task.find();
    }

    async add(data) {
        return await Task.create(data);
    }
}
