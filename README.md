# back-3

## Entrar dentro do container

```bash
docker exec -it back3-api bash
```

## Instalar libs

```bash
npm i dotenv knex mysql2
```

## Migrações

O que fazer quando uma migração der errado:

1. Apaga o banco de dados `drop schema db;`
1. Cria o banco de dados `create schema db;`

## Links

<https://knexjs.org/>
