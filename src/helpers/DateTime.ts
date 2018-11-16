import * as moment from 'moment';
import Formatter from './Formatter';

export default class DateTime {
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
}
