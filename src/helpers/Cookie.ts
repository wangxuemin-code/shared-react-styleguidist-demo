import * as Cookies from 'js-cookie';

export class Cookie {
  public static get(key: string) {
    const result = Cookies.get(key);
    return result;
  }
}
