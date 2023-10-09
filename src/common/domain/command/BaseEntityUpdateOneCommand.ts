import { BaseEntitySetCommand } from './BaseEntitySetCommand';
import { BaseEntityFindQuery } from '../query/BaseEntityFindQuery';

export interface BaseEntityUpdateOneCommand {
  findQuery: BaseEntityFindQuery;
  setCommand: BaseEntitySetCommand;
}
