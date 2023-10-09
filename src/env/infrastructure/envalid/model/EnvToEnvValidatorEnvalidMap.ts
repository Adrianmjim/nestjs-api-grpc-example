import { ValidatorSpec } from 'envalid';

export type EnvToEnvValidatorEnvalidMap<TData> = {
  [TKey in keyof TData]: ValidatorSpec<TData[TKey]>;
};
