import * as moment from 'moment';

export class Formatter {
  public static money(
    input: number | string | undefined,
    options: { decimalPlace?: number; symbol?: string } = {}
  ): string {
    if (!input) {
      input = 0;
    }

    if (typeof input === 'string') {
      input = parseFloat(input);
    }

    if (input < 0.000001) {
      input = 0;
    }

    input = Formatter.toFixedTrunc(input, options.decimalPlace || 4);

    return `${options.symbol || '$ '}${input.toLocaleString(undefined, {
      maximumFractionDigits: options.decimalPlace || 4
    })}`;
  }

  public static number(
    input: number | string | undefined,
    options: { decimalPlace?: number } = {}
  ): string {
    if (!input) {
      input = 0;
    }

    if (typeof input === 'string') {
      input = parseFloat(input);
    }

    if (input < 0.000001) {
      input = 0;
    }

    input = Formatter.toFixedTrunc(input, options.decimalPlace || 4);

    return `${input.toLocaleString(undefined, {
      maximumFractionDigits: options.decimalPlace || 4
    })}`;
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

  public static dateToUnixTimestamp(input: Date): number {
    return Math.floor(input.getTime() / 1000);
  }

  public static unixTimestampToDate(input?: number): Date | undefined {
    if (!input) {
      return undefined;
    }
    return new Date(input * 1000);
  }

  public static pluralize(input: number, unit: string): string {
    if (input <= 1) {
      return input + ' ' + unit;
    } else {
      return input + ' ' + unit + 's';
    }
  }

  public static toFixedTrunc(value: number, n: number): number {
    if (Formatter.countDecimals(value) <= n) {
      return value;
    }

    const v = value.toString().split('.');
    if (n <= 0) return parseFloat(v[0]);
    let f = v[1] || '';
    if (f.length > n) return parseFloat(`${v[0]}.${f.substr(0, n)}`);
    while (f.length < n) f += '0';
    return parseFloat(`${v[0]}.${f}`);
  }

  public static countDecimals(value: number) {
    if (Math.floor(value.valueOf()) === value.valueOf()) return 0;
    return value.toString().split('.')[1].length || 0;
  }
}
