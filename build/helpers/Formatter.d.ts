export declare class Formatter {
    static money(input: number | string | undefined, options?: {
        decimalPlace?: number;
        symbol?: string;
    }): string;
    static number(input: number | string | undefined, options?: {
        decimalPlace?: number;
    }): string;
    static stripSymbol(input: string): string;
    static datetime(input?: string | Date): string;
    static date(input?: string | Date): string;
    static time(input?: string | Date): string;
    static datetimeToDate(input?: string): Date;
    static dateToUnixTimestamp(input: Date): number;
    static unixTimestampToDate(input?: number): Date | undefined;
    static pluralize(input: number, unit: string): string;
    static toFixedTrunc(value: number, n: number): number;
    static countDecimals(value: number): number;
}
