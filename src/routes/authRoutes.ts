// src/routes/authRoutes.ts
import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);

// Rutas protegidas
router.get('/profile', authenticateToken, getProfile);

export default router;