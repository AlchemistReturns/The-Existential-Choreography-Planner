import { Task, ITask } from '../models/task';

export class TaskRepository {
    async getAll(): Promise<ITask[]> {
        return await Task.find();
    }

    async add(data: any): Promise<ITask> {
        return await Task.create(data);
    }
}
