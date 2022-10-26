import { Controller, Get } from '@nestjs/common';
import { AppHealthCheckUseCase } from '../usecases/app.usecase';

@Controller()
export class AppController {
  constructor(private readonly appHealthCheckUseCase: AppHealthCheckUseCase) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appHealthCheckUseCase.healthCheck();
  }
}
