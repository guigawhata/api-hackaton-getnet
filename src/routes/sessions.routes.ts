import { Router } from 'express';

import StoreSessionsService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const storeSession = new StoreSessionsService();

  const { user, token } = await storeSession.execute({ username, password });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
