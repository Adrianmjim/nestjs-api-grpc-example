export interface Manager<TInput = unknown, TOutput = unknown> {
  manage(input: TInput): TOutput;
}
