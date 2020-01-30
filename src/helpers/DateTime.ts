import moment from 'moment';
import { Formatter } from './Formatter';

export class DateTime {
  public static getDateDifferenceString(startDate?: Date, endDate?: Date): string {
    const endMoment = moment(endDate);
    const startMoment = moment(startDate);
    const duration = moment.duration(endMoment.diff(startMoment));
    const hours = Math.round(duration.asHours());
    if (hours >= 24) {
      return Formatter.pluralize(Math.round(duration.asDays()), 'day');
    } else if (hours <= 1) {
      return Formatter.pluralize(Math.round(duration.asMinutes()), 'minute');
    } else {
      return Formatter.pluralize(Math.round(hours), 'hour');
    }
  }

  public static minusDateByDays(input: Date, dayNumber: number): Date {
    const date = moment(input)
      .subtract(dayNumber, 'd')
      .toDate();
    return date;
  }

  public static getDateTimeFriendlyString(startDateTimeString: string, endDateTimeString: string) {
    const startMoment = moment(startDateTimeString);
    const endMoment = moment(endDateTimeString);
    const currentMoment = moment();

    if (currentMoment.isAfter(endMoment)) {
      return 'Ended';
    } else if (currentMoment.isAfter(startMoment)) {
      return 'Ends ' + moment(endMoment).fromNow();
    } else {
      return 'Starts ' + moment(startMoment).fromNow();
    }
  }

  public static getMoment(input: string | number) {
    if (isNaN(input as any)) {
      return moment(input);
    } else {
      return moment.unix(Number(input));
    }
  }
}
