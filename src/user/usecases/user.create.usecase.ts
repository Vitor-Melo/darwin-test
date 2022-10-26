import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../controllers/inputs/user.create.input';
import { User } from '../entity/user.entity';
import { UserRepositoryInterface } from '../repository/user.repository.interface';

@Injectable()
export class UserCreateUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = new User();

    user.birthDate = createUserInput.birthDate;
    user.name = createUserInput.name;
    user.username = createUserInput.username;
    user.document = createUserInput.document;
    user.email = createUserInput.email;
    user.phone = createUserInput.phone;

    return this.userRepository.save(user);
  }
}
