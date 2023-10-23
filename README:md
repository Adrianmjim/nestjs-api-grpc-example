# NestJS API gRPC Example 

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

 
<p align="center">
  <a href="https://github.com/Adrianmjim/nestjs-api-grpc-example/workflows/CI/badge.svg"><img src="https://github.com/Adrianmjim/nestjs-api-grpc-example/workflows/CI/badge.svg" /></a>
  <a href="https://codecov.io/gh/Adrianmjim/nestjs-api-grpc-example" > 
  <img src="https://codecov.io/gh/Adrianmjim/nestjs-api-grpc-example/graph/badge.svg?token=QZT9E52RPJ"/> 
  </a>
  <a href="https://codeclimate.com/github/Adrianmjim/nestjs-api-grpc-example/maintainability"><img src="https://api.codeclimate.com/v1/badges/001ca441a785966ce8be/maintainability" /></a>
</p>

## Description

gRPC API pet project built on top of NestJS using DDD, CQRS, MikroORM and PostgreSQL

## Requirements:

1. Install [NodeJS](https://nodejs.org) and [pnpm](https://pnpm.io)

2. Install dependencies

```bash
pnpm install
```

3. Add an .env file based on .env.example

## Database

We need a PostgreSQL instance to run the project. It's necessary to configure the environment variables for this database in the .env file. This project can also be launched with Docker Compose, which already includes the required database instance.

This repository uses [MikroORM](https://mikro-orm.io) and its [migration system](https://mikro-orm.io/docs/migrations). To apply the migrations, you need to run the following command:

```bash
npx mikro-orm migration:up
```

## Usage:

You can start the app in development mode:

```bash
pnpm start:dev
```

Or in production mode:

1. First, You need to build code:

```bash
pnpm build
```

2. Then, You can start app:

```bash
pnpm start:prod
```

To run the current repository using Docker Compose, follow these steps:

1. Build images

```bash
docker compose build
```

2. Run services

```bash
docker compose up
```

## Test

You can run test of this project:
```bash
pnpm test
```