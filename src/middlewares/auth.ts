// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'Degollado20';

interface DecodedToken {
  id: number;
    name: string;
    password: string;
  email: string;
  role: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
    if (!token) {
      res.status(401).json({ message: 'Token de autenticación no proporcionado' });
      return; // Solo finaliza la función, no retorna un valor
    }
  
    try {
      // Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      
      // Añadir datos del usuario a la solicitud
      (req as any).userId = decoded.id;
      (req as any).userRole = decoded.role;
  
      next();
    } catch (error) {
      res.status(403).json({ message: 'Token inválido o expirado' });
      return; // Solo finaliza la función, no retorna un valor
    }
  };

  export const authorizeRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const userRole = (req as any).userRole;
  
      if (!userRole || !roles.includes(userRole)) {
        res.status(403).json({ message: 'Acceso no autorizado' });
        return;
      }
  
      next();
    };
  };