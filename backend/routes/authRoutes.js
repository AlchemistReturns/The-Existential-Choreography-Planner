import express from 'express';
import { register, login, refresh, logoutUser, getProfile } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

// Protected routes
router.post('/logout', authenticateJWT, logoutUser);
router.get('/profile', authenticateJWT, getProfile);

export default router;
