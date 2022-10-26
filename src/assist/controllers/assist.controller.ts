import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Assist } from '../entity/assist.entity';
import { AssistGetByIdUseCase } from '../usecases/assist.getById.usecase';
import { AssistNotClosedAssistsUseCase } from '../usecases/assist.notClosed.byUserDocument.usecase';
import { AssistSaveUseCase } from '../usecases/assist.save.usecase';
import { CreateAssistInput } from './inputs/create.assist.input';

@Controller('assists')
export class AssistController {
  constructor(
    private readonly assistSaveUseCase: AssistSaveUseCase,
    private readonly assistGetByIdUseCase: AssistGetByIdUseCase,
    private readonly assistNotClosed: AssistNotClosedAssistsUseCase,
  ) {}

  @Post()
  async createAssist(@Body() createAssistInput: CreateAssistInput) {
    return this.assistSaveUseCase.createAssist(createAssistInput);
  }

  @Get(':id')
  async getAssist(@Param() { id }): Promise<Assist> {
    return this.assistGetByIdUseCase.getById(id);
  }

  @Get()
  async getAllNotClosedAssistsByDocument(@Query() query): Promise<Assist[]> {
    return this.assistNotClosed.getAssists(query.document);
  }
}
