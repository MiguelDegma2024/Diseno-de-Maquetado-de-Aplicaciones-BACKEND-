"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Rutas públicas
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
// Rutas protegidas
router.get('/profile', auth_1.authenticateToken, authController_1.getProfile);
exports.default = router;
