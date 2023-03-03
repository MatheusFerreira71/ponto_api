import { User } from '@prisma/client';
import ICreateUserDTO from '../dtos/ICreateUseDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAll(offset: number, limit: number): Promise<[User[], number]>;
  find(
    search: string,
    offset: number,
    limit: number,
  ): Promise<[User[], number]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: IUpdateUserDTO): Promise<User>;
  delete(id: number): Promise<string>;
}
