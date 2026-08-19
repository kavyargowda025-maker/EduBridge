import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const getJwtSecret = (): string => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    console.warn('[Security Warning] JWT_SECRET environment variable is missing in production environment.');
  }
  return 'abc_school_student_diary_secret_2026_dev_only';
};

export const JWT_SECRET = getJwtSecret();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    admission_no: string;
    role: 'student' | 'teacher' | 'admin';
    name: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AuthRequest['user'];
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired session token.' });
  }
};

export const requireRole = (roles: ('student' | 'teacher' | 'admin')[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};
