import { PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Assist } from 'src/assist/entity/assist.entity';
import docClient from 'src/databaseDynamoDb/clientDynamoDb';
import { DatabaseDynamoDb } from '../common/database.enum';

@Injectable()
export class AssistRepository {
  async save(assist: Assist): Promise<Assist> {
    const putUserParams: PutCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      Item: {
        PK: `${DatabaseDynamoDb.PK_ASSIST}#${assist.id}`,
        SK: `${DatabaseDynamoDb.PK_ASSIST}#${assist.userDocument}`,
        createdAt: assist.createdAt,
        latitude: assist.latitude,
        longitude: assist.longitude,
        address: assist.address,
        type: assist.type,
        status: assist.status,
      },
    };

    const command = new PutCommand(putUserParams);
    const response = await docClient.send(command);

    if (response.$metadata.httpStatusCode !== HttpStatus.OK) {
      return new Assist();
    }

    return assist;
  }
}
