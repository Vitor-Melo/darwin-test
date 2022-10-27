## Primeiro passo

**Copiar as variavéis de ambiente do exemplo**

`cp .env.example .env`

## Segundo passo

**Subir o container**

`docker-compose up -d`

## Terceiro passo

**Dar permissão na pasta para registrar o volume**

`sudo chmod -R 777 my-dynamodb-data`

## Quarto passo

**Executar o comando para subir a tabela**

`docker exec darwin-app npm run migrate:run`

## Extras

**Para rodar os testes**

`docker exec darwin-app npm run test`

**Caso queira ver o tabela do DynamoDb**

`npm install -g dynamodb-admin`

`DYNAMO_ENDPOINT=http://localhost:8000 dynamodb-admin`
