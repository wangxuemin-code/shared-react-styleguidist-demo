import * as moment from 'moment';
import BigNumber from 'bignumber.js';

export class Formatter {
  public static money(
    input: number | string | undefined,
    options: { decimalPlace?: number; symbol?: string; unit?: string; rounding?: 'up' | 'down' } = {}
  ): string {
    if (!input) {
      input = 0;
    }

    const roundMode = options.rounding ? options.rounding : 'up';

    BigNumber.set({ ROUNDING_MODE: roundMode == 'up' ? 0 : 1 });

    const resultBN = new BigNumber(input.toString());

    return `${options.symbol ? options.symbol + ' ' : ''}${resultBN.toFormat(options.decimalPlace || 0)}${
      options.unit ? ` ${options.unit}` : ''
    }`;
  }

  public static number(
    input: number | string | undefined,
    options: { decimalPlace?: number; rounding?: 'up' | 'down' } = {}
  ): string {
    if (!input) {
      input = 0;
    }

    const roundMode = options.rounding ? options.rounding : 'up';

    BigNumber.set({ ROUNDING_MODE: roundMode == 'up' ? 0 : 1 });

    const resultBN = new BigNumber(input.toString());

    return `${resultBN.toFormat(options.decimalPlace || 0)}`;
  }

  public static toBN(input: number | string | undefined | null) {
    if (!input) {
      input = 0;
    }

    return new BigNumber(input.toString());
  }

  public static stripSymbol(input: string): string {
    return input
      .replace('$', '')
      .replace(/,/g, '')
      .trim();
  }

  public static datetimeByFormat(format: string, input?: string | number | Date): string {
    return this.getMomentObject(format, input);
  }

  public static datetime(input?: string | number | Date): string {
    return this.getMomentObject('DD MMMM YYYY hh:mm A', input);
  }

  public static date(input?: string | number | Date): string {
    return this.getMomentObject('DD MMMM YYYY', input);
  }

  public static time(input?: string | number | Date): string {
    return this.getMomentObject('hh:mm A', input);
  }

  public static datetimeToDate(input?: string | number): Date {
    if (typeof input === 'number') {
      return moment.unix(input).toDate();
    } else if (isNaN(Number(input))) {
      return moment(input).toDate();
    } else {
      return moment.unix(Number(input)).toDate();
    }
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

  private static getMomentObject(format: string, input?: string | number | Date): string {
    if (typeof input !== 'string' && typeof input !== 'number') {
      return moment(input).format(format);
    } else if (typeof input === 'number') {
      return moment.unix(input).format(format);
    } else if (isNaN(Number(input))) {
      return moment(input).format(format);
    } else {
      return moment.unix(Number(input)).format(format);
    }
  }
}
