import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepositoryInterface } from '../repository/user.repository.interface';

@Injectable()
export class UserGetPhoneUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getUserByPhone(phone: string): Promise<User> {
    return this.userRepository.getUserByPhone(phone);
  }
}
