"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'Degollado20';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        res.status(401).json({ message: 'Token de autenticación no proporcionado' });
        return; // Solo finaliza la función, no retorna un valor
    }
    try {
        // Verificar el token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Añadir datos del usuario a la solicitud
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido o expirado' });
        return; // Solo finaliza la función, no retorna un valor
    }
};
exports.authenticateToken = authenticateToken;
const authorizeRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.userRole;
        if (!userRole || !roles.includes(userRole)) {
            res.status(403).json({ message: 'Acceso no autorizado' });
            return;
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
