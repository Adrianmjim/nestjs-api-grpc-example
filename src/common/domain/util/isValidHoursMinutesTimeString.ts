export const VALID_HOURS_MINUTES_TIME_STRING_REGEX: RegExp = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$|^24:00$/;

export function isValidHoursMinutesTimeString(hoursMinutesTimeString: string): boolean {
  const validHoursMinutesTimeString: boolean = VALID_HOURS_MINUTES_TIME_STRING_REGEX.test(hoursMinutesTimeString);

  return validHoursMinutesTimeString;
}
