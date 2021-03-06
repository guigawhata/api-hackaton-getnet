import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import chacsRouter from './chacs.routes';
import companiesRouter from './companies.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🌝' });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/chacs', chacsRouter);
routes.use('/companies', companiesRouter);

export default routes;
