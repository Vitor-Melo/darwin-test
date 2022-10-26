import { Module } from '@nestjs/common';
import { AssistRepository } from '../infrastructure/database/dynamodb/assist/repository/assist.repository';
import { AssistController } from './controllers/assist.controller';
import { AssistGetByIdUseCase } from './usecases/assist.getById.usecase';
import { AssistNotClosedAssistsUseCase } from './usecases/assist.notClosed.byUserDocument.usecase';
import { AssistSaveUseCase } from './usecases/assist.save.usecase';

export const ASSIST_REPOSITORY = 'ASSIST_REPOSITORY';

@Module({
  imports: [],
  controllers: [AssistController],
  providers: [
    AssistSaveUseCase,
    AssistGetByIdUseCase,
    AssistNotClosedAssistsUseCase,
    {
      provide: ASSIST_REPOSITORY,
      useClass: AssistRepository,
    },
  ],
})
export class AssistModule {}
