import { User } from '@prisma/client';
import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

export default class FindOneUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('ERRO: Nenhum usuário foi encontrado.', 404);
    }

    return user;
  }
}
