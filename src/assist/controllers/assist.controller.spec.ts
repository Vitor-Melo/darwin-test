import { AssistController } from './assist.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistSaveUseCase } from '../usecases/assist.save.usecase';
import { AssistGetByIdUseCase } from '../usecases/assist.getById.usecase';
import { AssistNotClosedAssistsUseCase } from '../usecases/assist.notClosed.byUserDocument.usecase';
import { ASSIST_REPOSITORY } from '../assist.module';
import { AssistRepository } from '../../infrastructure/database/dynamodb/assist/repository/assist.repository';
import { Types } from '../enums/assist.types.enum';
import { CreateAssistInput } from './inputs/create.assist.input';
import { AssistCreateOutput } from './outputs/assist.create.output';
import { Address } from '../entity/address.aggregate.entity';
import { Assist } from '../entity/assist.entity';

describe('AssistController', () => {
  let assistController: AssistController;
  let assistSaveUseCase: AssistSaveUseCase;
  let assistGetById: AssistGetByIdUseCase;
  let assistNotClosed: AssistNotClosedAssistsUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
    }).compile();

    assistController = app.get<AssistController>(AssistController);
    assistSaveUseCase = app.get<AssistSaveUseCase>(AssistSaveUseCase);
    assistGetById = app.get<AssistGetByIdUseCase>(AssistGetByIdUseCase);
    assistNotClosed = app.get<AssistNotClosedAssistsUseCase>(
      AssistNotClosedAssistsUseCase,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(assistController.get()).toBe('Hello World!');
    });

    it('test should return promise with id', async () => {
      const input: CreateAssistInput = {
        userDocument: '000.000.000-10',
        latitude: -40.4086,
        longitude: 40.4086,
        address: {
          street: 'Street Example',
          number: '1370',
          neighborhood: 'Neighborhood example',
          postalCode: '00000-000',
          city: 'São Paulo',
          state: 'SP',
        },
        type: Types['tire'],
      };

      const address: Address = {
        street: 'Street Example',
        number: '1370',
        neighborhood: 'Neighborhood example',
        postalCode: '00000-000',
        city: 'São Paulo',
        state: 'SP',
      };

      const assist: Assist = {
        id: 'SDJK213',
        userDocument: '000.000.000-10',
        latitude: -40.0,
        longitude: 40.0,
        createdAt: new Date().toDateString(),
        type: Types['tire'],
        status: true,
        address: address,
      };

      const output = new AssistCreateOutput();
      output.id = assist.id;

      jest
        .spyOn(assistSaveUseCase, 'createAssist')
        .mockImplementation(() => Promise.resolve(assist));

      expect(await assistController.createAssist(input)).toStrictEqual(output);
    });

    it('test should get an assist by id', async () => {
      const address: Address = {
        street: 'Street Example',
        number: '1370',
        neighborhood: 'Neighborhood example',
        postalCode: '00000-000',
        city: 'São Paulo',
        state: 'SP',
      };

      const assist: Assist = {
        id: 'SDJK213',
        userDocument: '000.000.000-10',
        latitude: -40.0,
        longitude: 40.0,
        createdAt: new Date().toDateString(),
        type: Types['tire'],
        status: true,
        address: address,
      };

      jest
        .spyOn(assistGetById, 'getById')
        .mockImplementation(() => Promise.resolve(assist));

      expect(await assistController.getAssist({ id: assist.id })).toStrictEqual(
        assist,
      );
    });
  });
});
