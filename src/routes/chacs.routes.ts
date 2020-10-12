import { Router } from 'express';

import CreateChacsService from '../services/CreateChacsService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { user_id, knowledge, hability, character, atitude } = request.body;

  const createChacsService = new CreateChacsService();

  const chac = await createChacsService.execute({
    user_id,
    knowledge,
    hability,
    character,
    atitude,
  });

  delete chac.user.password;

  return response.json(chac);
});

export default sessionsRouter;
