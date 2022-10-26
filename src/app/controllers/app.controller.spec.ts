import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppHealthCheckUseCase } from '../usecases/app.usecase';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppHealthCheckUseCase],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "{data: Health Check}"', async () => {
      expect(appController.get()).toEqual({ data: 'Health Check' });
    });
  });
});
