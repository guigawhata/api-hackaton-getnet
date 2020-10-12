import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🌝' });
});

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
