import { QueryCommand, QueryInput } from '@aws-sdk/client-dynamodb';
import {
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/entity/user.entity';
import { UserRepositoryInterface } from 'src/user/repository/user.repository.interface';
import docClient from '../../common/client.dynamodb';
import { DatabaseDynamoDb } from '../../common/database.enum';
import { UserDynamodb } from '../enum/user.dynamodb.enum';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  async save(user: User): Promise<User> {
    const putUserParams: PutCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      Item: {
        PK: `${UserDynamodb.PREFIX_KEY}#${user.document}`,
        SK: `${UserDynamodb.PREFIX_KEY}#${user.phone}`,
        username: user.username,
        name: user.name,
        email: user.email,
        document: user.document,
        phone: user.phone,
        birthDate: user.birthDate,
      },
    };

    const command = new PutCommand(putUserParams);
    const response = await docClient.send(command);

    if (response.$metadata.httpStatusCode !== HttpStatus.OK) {
      return null;
    }

    return user;
  }

  async getUserByDocument(userDocument: string): Promise<User> {
    const getUserParams: QueryCommandInput = {
      TableName: DatabaseDynamoDb.TABLE_NAME,
      KeyConditionExpression: 'PK = :partitionKey',
      ExpressionAttributeValues: {
        ':partitionKey': { S: `${UserDynamodb.PREFIX_KEY}#${userDocument}` },
      },
    };
    const command = new QueryCommand(getUserParams);
    const response = await docClient.send(command);

    if (response.Items.length === 0) {
      return null;
    }

    const user = new User();

    user.document = response.Items[0]?.document.S;
    user.birthDate = response.Items[0]?.birthDate.S;
    user.email = response.Items[0]?.email.S;
    user.name = response.Items[0]?.name.S;
    user.phone = response.Items[0]?.phone.S;
    user.username = response.Items[0]?.username.S;

    return user;
  }

  async getUserByPhone(phone: string): Promise<User> {
    const params: QueryInput = {
      ExpressionAttributeNames: {
        '#PK': 'SK',
      },
      ExpressionAttributeValues: {
        ':pk': { S: `${UserDynamodb.PREFIX_KEY}#${phone}` },
      },
      IndexName: 'user-index-1',
      KeyConditionExpression: '#PK = :pk',
      TableName: DatabaseDynamoDb.TABLE_NAME,
    };
    const command = new QueryCommand(params);
    const response = await docClient.send(command);

    if (response.Items.length === 0) {
      return null;
    }

    const user = new User();

    user.document = response.Items[0]?.document.S;
    user.birthDate = response.Items[0]?.birthDate.S;
    user.email = response.Items[0]?.email.S;
    user.name = response.Items[0]?.name.S;
    user.phone = response.Items[0]?.phone.S;
    user.username = response.Items[0]?.username.S;

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
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

    if (response.Items.length === 0) {
      return null;
    }

    const user = new User();

    user.document = response.Items[0]?.document.S;
    user.birthDate = response.Items[0]?.birthDate.S;
    user.email = response.Items[0]?.email.S;
    user.name = response.Items[0]?.name.S;
    user.phone = response.Items[0]?.phone.S;
    user.username = response.Items[0]?.username.S;

    return user;
  }
}
