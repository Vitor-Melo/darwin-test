import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppHealthCheckUseCase } from './usecases/app.usecase';
import { AssistModule } from '../assist/assist.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AssistModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppHealthCheckUseCase],
})
export class AppModule {}
