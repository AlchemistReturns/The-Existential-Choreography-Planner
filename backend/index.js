import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Existential Choreography Planner API' });
});

app.use('/api/tasks', taskRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
