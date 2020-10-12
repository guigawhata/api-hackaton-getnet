import { getRepository } from 'typeorm';
import moment from 'moment';

import AppError from '../errors/AppError';

import User from '../models/User';
import Chac from '../models/Chac';

import chacFormula from '../utils/chacformula';

interface Request {
  user_id: number;
  knowledge: number;
  hability: number;
  atitude: number;
  character: number;
}

class CreateChacsService {
  public async execute({
    user_id,
    character,
    hability,
    knowledge,
    atitude,
  }: Request): Promise<Chac> {
    const usersRepository = getRepository(User);

    const chacRepository = getRepository(Chac);

    const user = await usersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError(`User doesn't exists`);
    }

    const pickUserChacks = await chacRepository.find({
      where: {
        user,
      },
    });

    pickUserChacks.forEach(chac => {
      const chackDate = moment(chac.created_at).startOf('day');

      const threeMonthsBefore = moment()
        .subtract('3', 'months')
        .startOf('day')
        .format();

      const checkDate = moment(threeMonthsBefore).isAfter(chackDate);

      const nextAssessment = moment(chac.created_at)
        .add(3, 'months')
        .startOf('day')
        .format('DD/MM/YYYY, h:mm:ss');

      if (!checkDate) {
        throw new AppError(`This assessment can be made on ${nextAssessment}`);
      }
    });

    const chacResult = chacFormula({
      knowledge,
      hability,
      character,
      atitude,
    });

    const chac = chacRepository.create({
      user,
      atitude: chacResult.atitude,
      character: chacResult.character,
      hability: chacResult.hability,
      knowledge: chacResult.knowledge,
      behavioral_competence: chacResult.comportamental_competence,
      technical_competence: chacResult.technical_competence,
      status: chacResult.status,
    });

    await chacRepository.save(chac);

    return chac;
  }
}

export default CreateChacsService;
