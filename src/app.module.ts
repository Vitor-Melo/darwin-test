import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistModule } from './assist/assist.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AssistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
