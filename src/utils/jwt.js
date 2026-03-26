import jwt from 'jsonwebtoken';
import logger from '#src/config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = '1d'; // Token expires in 1 hour

export const jwttoken = {
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    } catch (err) {
      logger.error('Error signing token', { error: err });
      throw new Error('Error signing token', { cause: err });
    }
  },
  verify: (token) => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      logger.error('Error verifying token', { error: err });
      throw new Error('Invalid token', { cause: err });
    }
  },
}