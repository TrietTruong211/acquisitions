import express from 'express';
import logger from '#config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import securityMiddleware from './middleware/security.middleware.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(securityMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.get('/', (req, res) => {
  logger.info('Received request for root endpoint');
  res.status(200).json({ message: 'Hello World!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString(), uptime: process.uptime() });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'API is working', timestamp: new Date().toISOString() });
});

app.use('/api/auth', (await import('./routes/auth.routes.js')).default);
app.use('/api/users', (await import('./routes/users.routes.js')).default);

app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Not found', message: 'The requested resource was not found' });
});

export default app;
