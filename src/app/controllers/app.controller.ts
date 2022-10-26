import { Controller, Get } from '@nestjs/common';
import { AppHealthCheckUseCase } from '../usecases/app.usecase';

@Controller()
export class AppController {
  constructor(private readonly appHealthCheckUseCase: AppHealthCheckUseCase) {}

  @Get()
  get(): any {
    return this.appHealthCheckUseCase.healthCheck();
  }
}
