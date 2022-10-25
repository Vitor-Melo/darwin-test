import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoClient = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION || 'us-west-2',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId: process.env.DYNAMODB_CREDENTIALS_ACCESSKEY || 'test',
    secretAccessKey: process.env.DYNAMODB_CREDENTIALS_SECRETKEY || 'test2',
  },
});

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

const translateConfig = { marshallOptions, unmarshallOptions };
const docClient = DynamoDBDocumentClient.from(dynamoClient, translateConfig);

export default docClient;
