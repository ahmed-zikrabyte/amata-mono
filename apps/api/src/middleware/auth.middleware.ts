import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { ROLES } from '../constants';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}

const verifyToken = (token: string, secret: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

export const protect = (role: 'admin' | 'client') =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }

    const secret = role === ROLES.ADMIN ? config.adminJwt.secret : config.jwt.secret;

    try {
      const decoded = await verifyToken(token, secret);
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          new AppError("TOKEN_EXPIRED", 401)
        );
      }

      if (error instanceof JsonWebTokenError) {
        return next(
          new AppError("INVALID_TOKEN", 401)
        );
      }

      // Fallback for unknown authentication issues
      return next(
        new AppError("Authentication failed. Please log in again.", 401)
      );
    }
  });
