import { ValidationArguments } from 'class-validator';

export class ValidationArgumentsFixtures {
  public static get withValueToCompare2(): ValidationArguments {
    const validationArguments: ValidationArguments = {
      constraints: ['valueToCompare'],
      object: { valueToCompare: 2 },
      property: '',
      targetName: '',
      value: undefined,
    };

    return validationArguments;
  }

  public static get withValueToCompareUndefined(): ValidationArguments {
    const validationArguments: ValidationArguments = {
      constraints: ['valueToCompare'],
      object: { valueToCompare: undefined },
      property: '',
      targetName: '',
      value: undefined,
    };

    return validationArguments;
  }
}
