import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { requestLoggerMiddleware } from './request.logger.middleware';
import * as swaggerDoc from '../swagger.json';
import { RegisterRoutes } from './routes';

// Controllers need to be imported for tsoa to work
import './controllers/usersController';
import './controllers/loginController';
import './controllers/signupController';

const app: express.Express = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLoggerMiddleware);

RegisterRoutes(app);

try {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
} catch (err) {
  console.error('Unable to read swagger.json', err);
}

export { app };
