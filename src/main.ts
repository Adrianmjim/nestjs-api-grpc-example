import { INestMicroservice } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './AppModule';
import { grpcOptions } from './grpcConfig';
import { HttpExceptionToGrpcExceptionFilter } from './HttpExceptionToGrpcExceptionFilter';

async function bootstrap(): Promise<void> {
  const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, grpcOptions);

  app.useGlobalFilters(new HttpExceptionToGrpcExceptionFilter());

  app.enableShutdownHooks();

  await app.listen();
}

void bootstrap();
