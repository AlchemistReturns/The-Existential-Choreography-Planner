import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    duration: number; // in minutes
    dancers: number;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    dancers: { type: Number, required: true }
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
