import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepositoryInterface } from '../repository/user.repository.interface';

@Injectable()
export class UserGetByDocumentUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getUser(userDocument: string): Promise<User> {
    return this.userRepository.getUserByDocument(userDocument);
  }
}
