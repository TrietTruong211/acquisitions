import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().trim().max(255).min(1, 'Name is required'),
  email: z.string().trim().max(255).lowercase().email('Invalid email address'),
  password: z.string().trim().max(255).min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['user', 'admin']).default('user'),
});

export const signInSchema = z.object({
  email: z.string().trim().max(255).lowercase().email('Invalid email address'),
  password: z.string().trim().max(255).min(6, 'Password must be at least 6 characters long'),
});