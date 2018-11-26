export class Assessor {
  public static emptyArray(input: any[]): boolean {
    if (!input) {
      return true;
    }
    return input.length <= 0;
  }
}
