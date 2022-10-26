import { QueryCommand, QueryInput } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Status } from '../../../../../assist/enums/assist.status.enum';
import { Address } from '../../../../../assist/entity/address.aggregate.entity';
import { Assist } from '../../../../../assist/entity/assist.entity';
import { Types } from '../../../../../assist/enums/assist.types.enum';
import { AssistRepositoryInterface } from '../../../../../assist/repository/assist.repository.interface';
import docClient from '../../common/client.dynamodb';
import { DatabaseDynamoDb } from '../../common/database.enum';
import { AssistDynamodb } from '../enum/assist.dynamodb.enum';

@Injectable()
export class AssistRepository implements AssistRepositoryInterface {
  async save(assist: Assist): Promise<Assist> {
    const putUserParams: PutCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      Item: {
        PK: `${AssistDynamodb.PREFIX_KEY}#${assist.id}`,
        SK: `${AssistDynamodb.PREFIX_KEY}#${assist.userDocument}`,
        createdAt: assist.createdAt,
        latitude: assist.latitude,
        longitude: assist.longitude,
        address: assist.address,
        type: assist.type,
        finished: assist.finished ? 1 : 0,
        status: assist.status,
      },
    };

    const command = new PutCommand(putUserParams);
    const response = await docClient.send(command);

    if (response.$metadata.httpStatusCode !== HttpStatus.OK) {
      return null;
    }

    return assist;
  }

  async getById(id: string): Promise<Assist> {
    const getUserParams: QueryCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': { S: `${AssistDynamodb.PREFIX_KEY}#${id}` },
      },
    };
    const command = new QueryCommand(getUserParams);
    const response = await docClient.send(command);

    if (response.Items.length === 0) {
      return null;
    }

    const assist = new Assist();

    assist.createdAt = response.Items[0].createdAt.S;
    assist.id = id;
    assist.latitude = Number(response.Items[0].latitude.N);
    assist.longitude = Number(response.Items[0].longitude.N);
    assist.status = Status[response.Items[0]?.status?.S];
    assist.finished = Number(response.Items[0]?.finished?.N) === 1;
    assist.userDocument = response.Items[0].SK.S.split('#')[1];

    assist.status = <Status>response.Items[0]?.status?.S;
    assist.type = <Types>response.Items[0].type.S;

    const address = new Address();

    const assistAddress = Object.assign(address, {
      street: response.Items[0].address.M.street.S,
      number: response.Items[0].address.M.number.S,
      postalCode: response.Items[0].address.M.postalCode.S,
      city: response.Items[0].address.M.city.S,
      state: response.Items[0].address.M.state.S,
    });

    assist.address = assistAddress;

    return assist;
  }

  async getAllAssistNotClosedByUserDocument(
    userDocument: string,
  ): Promise<Assist[]> {
    const params: QueryInput = {
      ExpressionAttributeNames: {
        '#PK': 'SK',
        '#SK': 'finished',
      },
      ExpressionAttributeValues: {
        ':pk': { S: `${AssistDynamodb.PREFIX_KEY}#${userDocument}` },
        ':sk': { N: '0' },
      },
      IndexName: 'assist-index-1',
      KeyConditionExpression: '#SK = :sk and #PK = :pk',
      TableName: DatabaseDynamoDb.TABLE_NAME,
    };
    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items.length === 0) {
      return null;
    }

    const assist: Assist[] = response.Items.map((item) => {
      const assist = new Assist();

      assist.createdAt = item.createdAt.S;
      assist.id = item.PK.S.split('#')[1];
      assist.latitude = Number(item.latitude.N);
      assist.longitude = Number(item.longitude.N);
      assist.status = Status[item.type.S];
      assist.finished = Number(item.finished.N) === 1;
      assist.userDocument = item.SK.S.split('#')[1];
      assist.status = <Status>response.Items[0]?.status?.S;
      assist.type = <Types>response.Items[0].type.S;

      const address = new Address();

      const assistAddress = Object.assign(address, {
        street: item?.address.M?.street.S,
        number: item?.address.M?.number.S,
        postalCode: item?.address.M?.postalCode.S,
        city: item?.address.M?.city.S,
        state: item?.address.M?.state.S,
      });

      assist.address = assistAddress;
      return assist;
    });

    return assist;
  }
}
