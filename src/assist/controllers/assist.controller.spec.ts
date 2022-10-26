import { AssistController } from './assist.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistSaveUseCase } from '../usecases/assist.save.usecase';
import { AssistGetByIdUseCase } from '../usecases/assist.getById.usecase';
import { AssistNotClosedAssistsUseCase } from '../usecases/assist.notClosed.byUserDocument.usecase';
import { AssistRepository } from '../../infrastructure/database/dynamodb/assist/repository/assist.repository';
import { Types } from '../enums/assist.types.enum';
import { CreateAssistInput } from './inputs/create.assist.input';
import { AssistCreateOutput } from './outputs/assist.create.output';
import { Address } from '../entity/address.aggregate.entity';
import { Assist } from '../entity/assist.entity';
import { Status } from '../enums/assist.status.enum';

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
          provide: 'ASSIST_REPOSITORY',
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
    it('test should return output with id', async () => {
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
        finished: true,
        status: Status.RECEIVED,
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
        finished: true,
        status: Status.RECEIVED,
        address: address,
      };

      jest
        .spyOn(assistGetById, 'getById')
        .mockImplementation(() => Promise.resolve(assist));

      expect(await assistController.getAssist({ id: assist.id })).toEqual({
        status: assist.status,
      });
    });

    it('test should throw not found when find assist by id', async () => {
      const input = {
        id: 'DYN123',
      };

      jest
        .spyOn(assistGetById, 'getById')
        .mockImplementation(() => Promise.resolve(null));

      await expect(
        async () => await assistController.getAssist(input),
      ).rejects.toThrow(`not found assist by ID: ${input.id}`);
    });

    it('test should return an assists collection by user document', async () => {
      const address: Address = {
        street: 'Street Example',
        number: '1370',
        neighborhood: 'Neighborhood example',
        postalCode: '00000-000',
        city: 'São Paulo',
        state: 'SP',
      };

      const document = '000.000.000-10';

      const assist: Assist = {
        id: 'SDJK213',
        userDocument: document,
        latitude: -40.0,
        longitude: 40.0,
        createdAt: new Date().toDateString(),
        type: Types['tire'],
        finished: true,
        status: Status.RECEIVED,
        address: address,
      };

      jest
        .spyOn(assistNotClosed, 'getAssists')
        .mockImplementation(() => Promise.resolve([assist]));

      expect(
        await assistController.getAllNotClosedAssistsByDocument({
          document: document,
        }),
      ).toEqual([assist]);
    });
  });
});
