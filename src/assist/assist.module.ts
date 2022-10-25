import { Module } from '@nestjs/common';
import { AssistRepository } from 'src/infrastructure/assist/assist.repository';
import { AssistController } from './controllers/assist.controller';
import { AssistSaveUseCase } from './usecases/assist.save.usecase';

@Module({
  imports: [],
  controllers: [AssistController],
  providers: [AssistSaveUseCase, AssistRepository],
})
export class AssistModule {}
