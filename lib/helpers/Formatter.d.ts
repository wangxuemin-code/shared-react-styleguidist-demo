export default class Formatter {
    static money(input: number | string | undefined): string;
    static number(input: number | string | undefined): string;
    static stripSymbol(input: string): string;
    static datetime(input?: string): string;
    static date(input?: string | Date): string;
    static time(input?: string | Date): string;
    static datetimeToDate(input?: string): Date;
    static pluralize(input: number, unit: string): string;
}
