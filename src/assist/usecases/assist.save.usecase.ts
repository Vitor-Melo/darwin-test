import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateAssistInput } from '../controllers/inputs/create.assist.input';
import { Assist } from '../entity/assist.entity';
import { Status } from '../enums/assist.status.enum';
import { AssistRepositoryInterface } from '../repository/assist.repository.interface';

@Injectable()
export class AssistSaveUseCase {
  constructor(
    @Inject('ASSIST_REPOSITORY')
    private readonly assistRepository: AssistRepositoryInterface,
  ) {}

  async createAssist(createAssistInput: CreateAssistInput): Promise<Assist> {
    const assist = new Assist();

    const finished = [true, false];

    assist.id = uuid();
    assist.createdAt = new Date().toISOString();
    assist.latitude = createAssistInput.latitude;
    assist.longitude = createAssistInput.longitude;
    assist.finished = finished[Math.floor(Math.random() * finished.length)];
    assist.userDocument = createAssistInput.userDocument;
    assist.type = createAssistInput.type;

    const values = Object.keys(Status);
    const enumKey = values[Math.floor(Math.random() * values.length)];
    assist.status = Status[enumKey];

    assist.address = {
      street: createAssistInput?.address?.street,
      number: createAssistInput?.address?.number,
      neighborhood: createAssistInput?.address?.neighborhood,
      postalCode: createAssistInput?.address?.postalCode,
      city: createAssistInput?.address?.postalCode,
      state: createAssistInput?.address?.state,
    };

    return this.assistRepository.save(assist);
  }
}
