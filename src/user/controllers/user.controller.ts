import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserCreateUseCase } from '../usecases/user.create.usecase';
import { UserGetByDocumentUseCase } from '../usecases/user.getByDocument.usecase';
import { UserGetPhoneUseCase } from '../usecases/user.getPhone.usecase';
import { UserGetUsernameUsecase } from '../usecases/user.getUsername.usecase';
import { CreateUserInput } from './inputs/user.create.input';
import { UserGetInput } from './inputs/user.get.input';

@Controller('users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreateUseCase,
    private readonly userGetByDocument: UserGetByDocumentUseCase,
    private readonly userGetByPhone: UserGetPhoneUseCase,
    private readonly userGetByUsername: UserGetUsernameUsecase,
  ) {}

  @Post()
  async create(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.userCreate.createUser(createUserInput);
  }

  @Get()
  async getUser(@Query() userGetInput: UserGetInput): Promise<User> {
    if (userGetInput.phone) {
      return this.userGetByPhone.getUserByPhone(userGetInput.phone);
    }

    if (userGetInput.username) {
      return this.userGetByUsername.getUserByUsername(userGetInput.username);
    }

    if (userGetInput.document) {
      return this.userGetByDocument.getUser(userGetInput.document);
    }

    return null;
  }
}
