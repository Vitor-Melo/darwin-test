import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserUseCase } from '../usecases/user.usecase';
import { CreateUserInput } from './inputs/create.user.input';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  async create(@Body() createUserInput: CreateUserInput): Promise<User> {
    return this.userUseCase.createUser(createUserInput);
  }

  @Get()
  async getUser(@Query() query: any): Promise<User> {
    if (query.phone) {
      return this.userUseCase.getUserByPhone(query.phone);
    }

    if (query.username) {
      return this.userUseCase.getUserByUsername(query.username);
    }

    return this.userUseCase.getUser(query.cpf);
  }
}
