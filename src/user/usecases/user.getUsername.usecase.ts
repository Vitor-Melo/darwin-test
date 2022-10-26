import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepositoryInterface } from '../repository/user.repository.interface';

@Injectable()
export class UserGetUsernameUsecase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getUserByUsername(username);
  }
}
