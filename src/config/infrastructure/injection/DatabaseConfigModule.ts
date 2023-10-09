import { Module } from '@nestjs/common';

import { DatabaseEnvVariableModule } from '../../../envVariable/infrastructure/injection/DatabaseEnvVariableModule';
import { DatabaseConfig } from '../database/DatabaseConfig';

@Module({
  exports: [DatabaseConfig],
  imports: [DatabaseEnvVariableModule],
  providers: [DatabaseConfig],
})
export class DatabaseConfigModule {}
