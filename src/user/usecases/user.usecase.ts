import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/user/user.repository';
import { CreateUserInput } from '../controllers/inputs/create.user.input';
import { User } from '../entity/user.entity';

@Injectable()
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = {
      name: createUserInput.name,
      username: createUserInput.username,
      email: createUserInput.email,
      cpf: createUserInput.cpf,
      phone: createUserInput.phone,
      birthDate: createUserInput.birthDate,
    } as User;

    return this.userRepository.save(user);
  }

  async getUser(cpf: string): Promise<User> {
    return this.userRepository.getUserByDocument(cpf);
  }

  async getUserByPhone(phone: string): Promise<User> {
    return this.userRepository.getUserByPhone(phone);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getUserByUsername(username);
  }
}
