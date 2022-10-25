import { Body, Controller, Post } from '@nestjs/common';
import { AssistSaveUseCase } from '../usecases/assist.save.usecase';
import { CreateAssistInput } from './inputs/create.assist.input';

@Controller('assists')
export class AssistController {
  constructor(private readonly assistSaveUseCase: AssistSaveUseCase) {}

  @Post()
  async createAssist(@Body() createAssistInput: CreateAssistInput) {
    return this.assistSaveUseCase.createAssist(createAssistInput);
  }
}
