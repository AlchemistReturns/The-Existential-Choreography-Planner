import { Task } from '../models/task.js';

export class TaskRepository {
    async getAll() {
        return await Task.find();
    }

    async add(data) {
        return await Task.create(data);
    }

    async getById(id) {
        return await Task.findById(id);
    }

    async update(id, data) {
        return await Task.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Task.findByIdAndDelete(id);
    }
}
