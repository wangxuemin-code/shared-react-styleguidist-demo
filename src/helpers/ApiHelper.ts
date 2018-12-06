import { plainToClassFromExist } from 'class-transformer';

interface IApiOptions {
  type: 'get' | 'post' | 'put' | 'patch' | 'delete';
  postData: FormData;
}

export class ApiHelper {
  private getUrlPrefix: string;
  private otherUrlPrefix: string;

  constructor(GETPrefix: string, POSTPrefix: string) {
    this.getUrlPrefix = GETPrefix;
    this.otherUrlPrefix = POSTPrefix;
  }

  public start(path: string, methodType: string, data?: FormData) {
    let url;
    if (methodType === 'get') {
      url = `${this.getUrlPrefix}/${path}`;
    } else {
      url = `${this.otherUrlPrefix}/${path}`;
    }

    console.log('Sending ' + methodType + ' request to url: ' + url);
    const request = new Request(url, {
      method: methodType.toUpperCase(),
      credentials: 'include',
      body: data
    });
    return fetch(request)
      .then((response) => {
        if (response.status === 404) {
          return Promise.reject('404 not found.');
        } else if (response.status === 500) {
          return Promise.reject('500 internal error.');
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error.message ? error.message : error);
      });
  }

  public createSingleApi<T>(type: new () => T, url: string, options?: IApiOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.createApi(url, options)
        .then((json) => {
          resolve(plainToClassFromExist(new type(), json));
        })
        .catch(reject);
    });
  }

  public createArrayApi<T>(
    type: new () => T,
    url: string,
    key: string,
    options?: IApiOptions
  ): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      this.createApi(url, options)
        .then((json) => {
          const arr = json[key];
          const results: T[] = [];
          for (const item of arr) {
            results.push(plainToClassFromExist(new type(), item));
          }
          resolve(results);
        })
        .catch(reject);
    });
  }

  public createVoidApi(url: string, options?: IApiOptions): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.createApi(url, options)
        .then(() => {
          resolve();
        })
        .catch(reject);
    });
  }

  public createApi(
    url: string,
    options: IApiOptions = { type: 'get', postData: new FormData() }
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const apiPromise = this.start(url, options.type, options.postData);

      apiPromise
        .then((json) => {
          resolve(json);
        })
        .catch(reject);
    });
  }
}
