import AppError from '../../../shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';

export default class CheckIfHasPasswordService {
  constructor(private userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async execute(email: string): Promise<boolean> {
    const user = await this.userRepo.findByEmail(email).catch(err => {
      throw new AppError(`${err}`);
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return !!user.password;
  }
}
