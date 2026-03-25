import logger from '#config/logger.js';
import { signupSchema } from '#src/validations/auth.validation.js';

export const signup = async (req, res, next) => {
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Invalid request data', 
        details: validationResult.error.errors 
      });
    }

    const {name, email, role} = validationResult.data;

    // AUTH service call to create user

    logger.info('User signed up successfully', { email, name, role });
    res.status(201).json({ message: 'User signed up successfully', user: { email, name, role } });
  } catch (error) {
    logger.error('Error in signup controller', { error });
    if (error.message === 'User with this email already exists' ) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    next(error);

  }
}