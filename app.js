import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import bookRoutes from './src/routers/book_routes.js';
import authorRoutes from './src/routers/author_routes.js';
import readingRoutes from './src/routers/reading_routes.js';
import userRoutes from './src/routers/user_routes.js';

import { globalErrorHandler } from './src/middlewares/error_middleware.js';
import logger from './src/middlewares/logger_middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(logger);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src' ,'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/users', userRoutes);

app.use(globalErrorHandler);

export default app;