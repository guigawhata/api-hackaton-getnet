import { Router } from 'express';

import usersRouter from './users.routes';

import { connectedTotems } from '../utils/sockets';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World! 🌝' });
});

routes.use('/users', usersRouter);

export default routes;
