import { Router } from 'express';

import CreateCompanyService from '../services/CreateCompanyService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const {
    user_id,
    cnpj,
    cpf,
    social_reason,
    fantasy_name,
    type,
  } = request.body;

  const createCompanyService = new CreateCompanyService();

  const company = await createCompanyService.execute({
    user_id,
    cnpj,
    cpf,
    social_reason,
    fantasy_name,
    type,
  });

  return response.json(company);
});

export default sessionsRouter;
