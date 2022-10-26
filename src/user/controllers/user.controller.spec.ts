import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infrastructure/database/dynamodb/user/repository/user.repository';
import { User } from '../entity/user.entity';
import { UserCreateUseCase } from '../usecases/user.create.usecase';
import { UserGetByDocumentUseCase } from '../usecases/user.getByDocument.usecase';
import { UserGetPhoneUseCase } from '../usecases/user.getPhone.usecase';
import { UserGetUsernameUsecase } from '../usecases/user.getUsername.usecase';
import { CreateUserInput } from './inputs/user.create.input';
import { UserGetInput } from './inputs/user.get.input';
import { UserController } from './user.controller';

describe('UserControlller', () => {
  let userController: UserController;
  let userCreateUseCase: UserCreateUseCase;
  let userGetByDocumentUseCase: UserGetByDocumentUseCase;
  let userGetByUsernameUseCase: UserGetUsernameUsecase;
  let userGetByPhoneUseCase: UserGetPhoneUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserCreateUseCase,
        UserGetByDocumentUseCase,
        UserGetPhoneUseCase,
        UserGetUsernameUsecase,
        {
          provide: 'USER_REPOSITORY',
          useClass: UserRepository,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userCreateUseCase = app.get<UserCreateUseCase>(UserCreateUseCase);
    userGetByDocumentUseCase = app.get<UserGetByDocumentUseCase>(
      UserGetByDocumentUseCase,
    );
    userGetByUsernameUseCase = app.get<UserGetUsernameUsecase>(
      UserGetUsernameUsecase,
    );
    userGetByPhoneUseCase = app.get<UserGetPhoneUseCase>(UserGetPhoneUseCase);
  });

  describe('root', () => {
    it('test should return created user', async () => {
      const input = new CreateUserInput();
      input.name = 'darwin';
      input.username = 'darwin';
      input.document = '000.000.000-10';
      input.email = 'example@gmail.com';
      input.phone = '1193445234';
      input.birthDate = new Date().toISOString();

      const user = new User();
      user.name = input.name;
      user.username = input.username;
      user.document = input.document;
      user.email = input.email;
      user.phone = input.phone;
      user.birthDate = input.birthDate;

      jest
        .spyOn(userCreateUseCase, 'createUser')
        .mockImplementation(() => Promise.resolve(user));

      expect(await userController.create(input)).toStrictEqual(user);
    });

    it('test should return an user by username', async () => {
      const user = new User();
      user.name = 'darwin';
      user.username = 'darwin';
      user.document = '000.000.000-10';
      user.email = 'example@gmail.com';
      user.phone = '1193445234';
      user.birthDate = new Date().toISOString();

      const input = new UserGetInput();
      input.username = user.username;

      jest
        .spyOn(userGetByUsernameUseCase, 'getUserByUsername')
        .mockImplementation(() => Promise.resolve(user));

      expect(await userController.getUser(input)).toStrictEqual(user);
    });

    it('test should return an user by document', async () => {
      const user = new User();
      user.name = 'darwin';
      user.username = 'darwin';
      user.document = '000.000.000-10';
      user.email = 'example@gmail.com';
      user.phone = '1193445234';
      user.birthDate = new Date().toISOString();

      const input = new UserGetInput();
      input.document = user.document;

      jest
        .spyOn(userGetByDocumentUseCase, 'getUser')
        .mockImplementation(() => Promise.resolve(user));

      expect(await userController.getUser(input)).toStrictEqual(user);
    });

    it('test should return an user by phone', async () => {
      const user = new User();
      user.name = 'darwin';
      user.username = 'darwin';
      user.document = '000.000.000-10';
      user.email = 'example@gmail.com';
      user.phone = '1193445234';
      user.birthDate = new Date().toISOString();

      const input = new UserGetInput();
      input.phone = user.phone;

      jest
        .spyOn(userGetByPhoneUseCase, 'getUserByPhone')
        .mockImplementation(() => Promise.resolve(user));

      expect(await userController.getUser(input)).toStrictEqual(user);
    });
  });
});
