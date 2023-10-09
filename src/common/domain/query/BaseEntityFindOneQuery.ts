import { BaseEntityFindQuery } from './BaseEntityFindQuery';

export interface BaseEntityFindOneQuery extends Omit<BaseEntityFindQuery, 'limit'> {}
