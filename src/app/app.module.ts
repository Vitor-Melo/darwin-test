import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppHealthCheckUseCase } from './usecases/app.usecase';
import { AssistModule } from '../assist/assist.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, AssistModule],
  controllers: [AppController],
  providers: [AppHealthCheckUseCase],
})
export class AppModule {}
