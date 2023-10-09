import { Injectable } from '@nestjs/common';

import { LoadDataDotenvAdapter } from '../../../env/infrastructure/dotenv/adapter/LoadDataDotenvAdapter';
import { DatabaseEnvVariables } from '../../domain/model/DatabaseEnvVariables';
import { databaseEnvVariablesToEnvVariablesValidatorEnvalidMap } from '../envalid/model/databaseEnvVariablesToEnvVariablesValidatorEnvalidMap';

@Injectable()
export class LoadDatabaseEnvVariablesDotenvAdapter extends LoadDataDotenvAdapter<DatabaseEnvVariables> {
  public constructor() {
    super(databaseEnvVariablesToEnvVariablesValidatorEnvalidMap);
  }
}
