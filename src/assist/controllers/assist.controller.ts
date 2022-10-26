import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Assist } from '../entity/assist.entity';
import { AssistGetByIdUseCase } from '../usecases/assist.getById.usecase';
import { AssistNotClosedAssistsUseCase } from '../usecases/assist.notClosed.byUserDocument.usecase';
import { AssistSaveUseCase } from '../usecases/assist.save.usecase';
import { CreateAssistInput } from './inputs/create.assist.input';
import { AssistCreateOutput } from './outputs/assist.create.output';

@Controller('assists')
export class AssistController {
  constructor(
    private readonly assistSaveUseCase: AssistSaveUseCase,
    private readonly assistGetByIdUseCase: AssistGetByIdUseCase,
    private readonly assistNotClosed: AssistNotClosedAssistsUseCase,
  ) {}

  @Post()
  async createAssist(
    @Body() createAssistInput: CreateAssistInput,
  ): Promise<AssistCreateOutput> {
    const assist = await this.assistSaveUseCase.createAssist(createAssistInput);

    const output = new AssistCreateOutput();
    output.id = assist.id;
    return output;
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
