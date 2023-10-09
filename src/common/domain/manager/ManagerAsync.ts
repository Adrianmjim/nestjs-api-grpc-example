import { Manager } from './Manager';

export type ManagerAsync<TInput = unknown, TOutput = unknown> = Manager<TInput, Promise<TOutput>>;
