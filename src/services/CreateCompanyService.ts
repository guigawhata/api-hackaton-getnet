import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';
import Company from '../models/Company';

import api from '../utils/apiReceitaWs';

interface Request {
  user_id: number;
  cnpj: string;
  cpf: string;
  social_reason: string;
  fantasy_name: string;
  type: 'MATRIZ' | 'FILIAL';
}

class CreateCompanyService {
  public async execute({
    user_id,
    cnpj,
    cpf,
    social_reason,
    fantasy_name,
    type,
  }: Request): Promise<Company> {
    const usersRepository = getRepository(User);

    const companyRepository = getRepository(Company);

    const user = await usersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError(`User doesn't exists`);
    }

    if (!cnpj) {
      const company = companyRepository.create({
        user,
        cpf,
        fantasy_name,
        type,
      });

      await companyRepository.save(company);

      return company;
    }

    const response = await api.get(`/${cnpj.replace(/(\.|\/|-)/g, '')}`);

    if (response.data.situacao !== 'ATIVA') {
      throw new AppError(`Non-active companies cannot be linked`);
    }

    const company = companyRepository.create({
      user,
      social_reason: response.data.nome,
      fantasy_name: response.data.fantasia,
      cnpj: response.data.cnpj,
      situation: response.data.situacao,
      type: response.data.tipo,
    });

    await companyRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
