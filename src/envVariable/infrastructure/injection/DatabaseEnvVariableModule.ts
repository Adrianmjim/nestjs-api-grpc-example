import { Module } from '@nestjs/common';

import { LoadDatabaseEnvVariablesDotenvAdapter } from '../adapter/LoadDatabaseEnvVariablesDotenvAdapter';

@Module({
  exports: [LoadDatabaseEnvVariablesDotenvAdapter],
  providers: [LoadDatabaseEnvVariablesDotenvAdapter],
})
export class DatabaseEnvVariableModule {}
