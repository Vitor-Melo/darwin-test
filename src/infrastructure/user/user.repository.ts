import { QueryCommand, QueryInput } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { HttpStatus, Injectable } from '@nestjs/common';
import docClient from 'src/databaseDynamoDb/clientDynamoDb';
import { User } from 'src/user/entity/user.entity';
import { UserRepositoryInterface } from 'src/user/repository/user.repository.interface';
import { DatabaseDynamoDb } from '../common/database.enum';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<User> {
    const putUserParams: PutCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      Item: {
        PK: `${DatabaseDynamoDb.PK_USER}#${user.cpf}`,
        SK: `${DatabaseDynamoDb.PK_USER}#${user.phone}`,
        username: user.username,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        phone: user.phone,
        birthDate: user.birthDate,
      },
    };

    const command = new PutCommand(putUserParams);
    const response = await docClient.send(command);

    if (response.$metadata.httpStatusCode !== HttpStatus.OK) {
      return new User();
    }

    return user;
  }

  async getUserByDocument(cpf: string): Promise<User> {
    const getUserParams: QueryCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      KeyConditionExpression: 'PK = :partitionKey',
      ExpressionAttributeValues: {
        ':partitionKey': { S: `${DatabaseDynamoDb.PK_USER}#${cpf}` },
      },
    };
    const command = new QueryCommand(getUserParams);
    const response = await docClient.send(command);

    return response.Items.length
      ? ({
          username: response.Items[0].username.S,
        } as unknown as User)
      : null;
  }

  async getUserByPhone(phone: string): Promise<User> {
    const params: QueryInput = {
      ExpressionAttributeNames: {
        '#PK': 'SK',
      },
      ExpressionAttributeValues: {
        ':pk': { S: `${DatabaseDynamoDb.PK_USER}#${phone}` },
      },
      IndexName: 'user-index-1',
      KeyConditionExpression: '#PK = :pk',
      TableName: DatabaseDynamoDb.TABLE_NAME,
    };
    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    return response.Items.length
      ? ({
          username: response.Items[0].username.S,
        } as unknown as User)
      : null;
  }

  async getUserByUsername(username: string) {
    const params: QueryInput = {
      ExpressionAttributeNames: {
        '#PK': 'username',
      },
      ExpressionAttributeValues: {
        ':username': { S: `${username}` },
      },
      IndexName: 'user-index-2',
      KeyConditionExpression: '#PK = :username',
      TableName: DatabaseDynamoDb.TABLE_NAME,
    };
    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    return response.Items.length
      ? ({
          username: response.Items[0].username.S,
        } as unknown as User)
      : null;
  }
}
