import { Injectable } from '@nestjs/common';
import { AssistRepository } from 'src/infrastructure/assist/assist.repository';
import { v4 as uuid } from 'uuid';
import { CreateAssistInput } from '../controllers/inputs/create.assist.input';
import { Assist } from '../entity/assist.entity';

@Injectable()
export class AssistSaveUseCase {
  constructor(private readonly assistRepository: AssistRepository) {}

  async createAssist(createAssistInput: CreateAssistInput): Promise<Assist> {
    const assist = new Assist();

    const status = [true, false];

    assist.id = uuid();
    assist.address = createAssistInput.address;
    assist.createdAt = new Date().toISOString();
    assist.latitude = createAssistInput.latitude;
    assist.longitude = createAssistInput.longitude;
    assist.status = status[Math.floor(Math.random() * status.length)];
    assist.userDocument = createAssistInput.userDocument;
    assist.type = createAssistInput.type;

    return this.assistRepository.save(assist);
  }
}
