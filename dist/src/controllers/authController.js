"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user"); // Ajusta la ruta según la ubicación de tu modelo
const JWT_SECRET = process.env.JWT_SECRET || 'Degollado20';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role = 'user' } = req.body;
        // Verificar si el usuario ya existe
        const existingUser = yield user_1.User.findOne({
            where: { email }
        });
        if (existingUser) {
            res.status(400).json({ message: 'El email ya está registrado' });
            return;
        }
        // Encriptar la contraseña
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Crear el usuario
        const user = yield user_1.User.create({
            name,
            email,
            password: hashedPassword,
            role: role
        });
        // Crear un objeto nuevo sin la contraseña en lugar de modificar el original
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: userWithoutPassword
        });
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Buscar usuario por email
        const user = yield user_1.User.findOne({
            where: { email }
        });
        if (!user) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        // Verificar contraseña
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        // Generar token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        // Crear un objeto nuevo sin la contraseña en lugar de modificar el original
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user: userWithoutPassword,
            token
        });
    }
    catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield user_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Crear un objeto nuevo sin la contraseña en lugar de modificar el original
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.status(200).json(userWithoutPassword);
    }
    catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getProfile = getProfile;
