import { Inject, Injectable } from '@nestjs/common';
import { Assist } from 'src/assist/entity/assist.entity';
import { AssistRepositoryInterface } from 'src/assist/repository/assist.repository.interface';

@Injectable()
export class AssistNotClosedAssistsUseCase {
  constructor(
    @Inject('ASSIST_REPOSITORY')
    private readonly assistRepository: AssistRepositoryInterface,
  ) {}

  async getAssists(userDocument: string): Promise<Assist[]> {
    return this.assistRepository.getAllAssistNotClosedByUserDocument(
      userDocument,
    );
  }
}
