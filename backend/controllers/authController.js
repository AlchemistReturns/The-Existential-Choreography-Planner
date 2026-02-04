import passport from 'passport';
import { registerUser, generateTokens, refreshTokens, logout } from '../services/authService.js';

// Register new user
export const register = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;

        // Validate required fields
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required: fullName, username, email, password'
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long'
            });
        }

        const result = await registerUser({ fullName, username, email, password });

        res.status(201).json({
            message: 'Registration successful',
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login with email and password
export const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ message: info?.message || 'Invalid credentials' });
        }

        // Generate tokens
        const tokens = generateTokens(user);

        res.json({
            message: 'Login successful',
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    })(req, res, next);
};

// Refresh access token
export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }

        const tokens = await refreshTokens(refreshToken);

        res.json({
            message: 'Tokens refreshed successfully',
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Logout
export const logoutUser = async (req, res) => {
    try {
        await logout(req.user._id);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out' });
    }
};

// Get current user profile
export const getProfile = (req, res) => {
    res.json({ user: req.user });
};
