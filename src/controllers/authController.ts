import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user'; // Ajusta la ruta según la ubicación de tu modelo

const JWT_SECRET = process.env.JWT_SECRET || 'Degollado20';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      res.status(400).json({ message: 'El email ya está registrado' });
      return;
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role as 'admin' | 'user'
    });

    // Crear un objeto nuevo sin la contraseña en lugar de modificar el original
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciales inválidas' });
      return;
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Crear un objeto nuevo sin la contraseña en lugar de modificar el original
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    // Crear un objeto nuevo sin la contraseña en lugar de modificar el original
    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};