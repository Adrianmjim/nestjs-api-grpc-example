import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';

import { AppController } from './AppController';
import { CatModule } from './cat/infrastructure/injection/CatModule';
import { DatabaseConfig } from './config/infrastructure/database/DatabaseConfig';
import { getMikroOrmModuleOptions } from './config/infrastructure/database/getMikroOrmModuleOptions';
import { DatabaseConfigModule } from './config/infrastructure/injection/DatabaseConfigModule';
import { grpcOptions } from './grpcConfig';

@Module({
  controllers: [AppController],
  imports: [
    CatModule,
    GrpcReflectionModule.register(grpcOptions),
    MikroOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfig],
      useFactory: getMikroOrmModuleOptions,
    }),
  ],
})
export class AppModule {}
