import { AnyEntity } from '@mikro-orm/core';

export class AnyEntityFixtures {
  public static get any(): AnyEntity {
    const anyEntity: AnyEntity = {};

    return anyEntity;
  }
}
