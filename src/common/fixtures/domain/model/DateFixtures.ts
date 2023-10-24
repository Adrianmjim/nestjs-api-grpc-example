export class DateFixtures {
  public static get any(): Date {
    return new Date('2022-01-01');
  }

  public static get createdAt(): Date {
    return new Date('2020-01-01');
  }

  public static get updatedAt(): Date {
    return new Date('2020-02-01');
  }
}
