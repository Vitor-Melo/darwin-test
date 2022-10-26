import { Assist } from '../entity/assist.entity';

export interface AssistRepositoryInterface {
  save(assist: Assist): Promise<Assist>;
  getById(id: string): Promise<Assist>;
  getAllAssistNotClosedByUserDocument(userDocument: string): Promise<Assist[]>;
}
