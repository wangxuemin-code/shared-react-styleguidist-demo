import * as moment from 'moment';

export default class Formatter {
  public static money(input: number | string | undefined): string {
    if (!input) {
      input = 0;
    }

    if (typeof input === 'string') {
      input = parseFloat(input);
    }

    return `$${input.toLocaleString()}`;
  }

  public static number(input: number | string | undefined): string {
    if (!input) {
      input = 0;
    }

    if (typeof input === 'string') {
      input = parseFloat(input);
    }

    return `${input.toLocaleString()}`;
  }

  public static stripSymbol(input: string): string {
    return input.replace('$', '').replace(/,/g, '');
  }

  public static datetime(input?: string): string {
    return moment(input).format('DD MMMM YYYY hh:mm A');
  }

  public static date(input?: string | Date): string {
    return moment(input).format('DD MMM');
  }

  public static time(input?: string | Date): string {
    return moment(input).format('hh:mm A');
  }

  public static datetimeToDate(input?: string): Date {
    return moment(input).toDate();
  }

  public static pluralize(input: number, unit: string): string {
    if (input <= 1) {
      return input + ' ' + unit;
    } else {
      return input + ' ' + unit + 's';
    }
  }
}
