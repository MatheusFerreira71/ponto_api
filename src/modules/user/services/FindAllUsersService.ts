import { User } from '@prisma/client';
import IUserRepository from '../repositories/IUserRepository';

export default class FindAllUsersService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    offset: number,
    limit: number,
  ): Promise<[User[], number]> {
    const users = await this.userRepository.findAll(offset, limit);

    if (!users[0].length) {
      return users;
    }

    const totalPage =
      users[1] % limit === 0
        ? users[1] / limit
        : parseInt(`${users[1] / limit}`, 10) + 1;

    return [users[0], totalPage];
  }
}
