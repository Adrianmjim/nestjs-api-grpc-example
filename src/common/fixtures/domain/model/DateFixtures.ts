export class DateFixtures {
  public static get any(): Date {
    return new Date('2022-01-01');
  }

  public static get anyPlusOneYear(): Date {
    return new Date(this.any.setFullYear(this.any.getFullYear() + 1));
  }

  public static get createdAt(): Date {
    return new Date('2020-01-01');
  }

  public static get firstMondaySinceEpoch(): Date {
    return new Date('1970-01-05');
  }

  public static get firstSundaySinceEpoch(): Date {
    return new Date('1970-01-04');
  }

  public static get firstSundaySinceEpochAt8AM(): Date {
    return new Date(this.firstSundaySinceEpoch.setHours(8));
  }

  public static get firstThursdaySinceEpoch(): Date {
    return new Date('1970-01-01');
  }

  public static get secondMondaySinceEpoch(): Date {
    return new Date('1970-01-12');
  }

  public static get updatedAt(): Date {
    return new Date('2020-02-01');
  }

  public static get validAt(): Date {
    return new Date('2020-03-01');
  }
}
