import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    dancers: { type: Number, required: true }
});

export const Task = mongoose.model('Task', TaskSchema);
