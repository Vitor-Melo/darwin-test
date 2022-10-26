import { Inject, Injectable } from '@nestjs/common';
import { Assist } from '../entity/assist.entity';
import { AssistRepositoryInterface } from '../repository/assist.repository.interface';

@Injectable()
export class AssistGetByIdUseCase {
  constructor(
    @Inject('ASSIST_REPOSITORY')
    private readonly assistRepository: AssistRepositoryInterface,
  ) {}

  async getById(id: string): Promise<Assist> {
    return this.assistRepository.getById(id);
  }
}
