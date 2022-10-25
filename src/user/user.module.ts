import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/user/user.repository';
import { UserController } from './controllers/user.controller';
import { UserUseCase } from './usecases/user.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserUseCase, UserRepository],
})
export class UserModule {}
