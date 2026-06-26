import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import cors from 'cors';

import WebController from './src/controllers/web_controller.js';

import bookRoutes from './src/routers/book_routes.js';
//import authorRoutes from './src/routers/author_routes.js';
import userRoutes from './src/routers/user_routes.js';
import authRoutes from './src/routers/auth_routes.js';
import userLibraryRoutes from './src/routers/user_library_routes.js';

import { globalErrorHandler } from './src/middlewares/error_middleware.js';
import logger from './src/middlewares/logger_middleware.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
    fs.readFileSync(new URL('./src/docs/swagger.json', import.meta.url))
);

const app = express();

app.use(logger);

app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src' ,'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/library', userLibraryRoutes);

app.use('/catalogue', WebController.renderPublicCatalogue);

app.use(globalErrorHandler);

export default app;