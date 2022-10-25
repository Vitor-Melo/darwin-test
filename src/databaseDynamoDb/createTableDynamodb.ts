import {
  CreateTableCommand,
  CreateTableInput,
  GlobalSecondaryIndex,
} from '@aws-sdk/client-dynamodb';
import client from './clientDynamoDb';

const DATABASE_TABLE_NAME = 'darwin';

const dynamoTableParams: CreateTableInput = {
  TableName: DATABASE_TABLE_NAME,
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' },
    { AttributeName: 'SK', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'PK', AttributeType: 'S' },
    { AttributeName: 'SK', AttributeType: 'S' },
    { AttributeName: 'username', AttributeType: 'S' },
    { AttributeName: 'status', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: 'user-index-1',
      KeySchema: [
        { AttributeName: 'SK', KeyType: 'HASH' },
        { AttributeName: 'PK', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
    } as GlobalSecondaryIndex,
    {
      IndexName: 'user-index-2',
      KeySchema: [
        { AttributeName: 'username', KeyType: 'HASH' },
        { AttributeName: 'PK', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
    } as GlobalSecondaryIndex,
    {
      IndexName: 'assist-index-1',
      KeySchema: [
        { AttributeName: 'SK', KeyType: 'HASH' },
        { AttributeName: 'status', KeyType: 'RANGE' },
      ],
      Projection: {
        ProjectionType: 'ALL',
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2,
      },
    } as GlobalSecondaryIndex,
  ],
};

const command = new CreateTableCommand(dynamoTableParams);

client
  .send(command)
  .then((r) => {
    console.log(r);
  })
  .catch((e) => {
    console.log('error', e);
  });
