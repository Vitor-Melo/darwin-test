import { Module } from '@nestjs/common';
import { UserRepository } from '../infrastructure/database/dynamodb/user/repository/user.repository';
import { UserController } from './controllers/user.controller';
import { UserCreateUseCase } from './usecases/user.create.usecase';
import { UserGetByDocumentUseCase } from './usecases/user.getByDocument.usecase';
import { UserGetPhoneUseCase } from './usecases/user.getPhone.usecase';
import { UserGetUsernameUsecase } from './usecases/user.getUsername.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserCreateUseCase,
    UserGetPhoneUseCase,
    UserGetByDocumentUseCase,
    UserGetUsernameUsecase,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
