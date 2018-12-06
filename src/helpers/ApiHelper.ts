import { plainToClassFromExist } from 'class-transformer';

interface IApiOptions {
  type: 'get' | 'post';
  postData: FormData;
}

export class ApiHelper {
  private getUrlPrefix: string;
  private otherUrlPrefix: string;

  constructor(GETPrefix: string, POSTPrefix: string) {
    this.getUrlPrefix = GETPrefix;
    this.otherUrlPrefix = POSTPrefix;
  }

  public get(path: string) {
    const url = `${this.getUrlPrefix}/${path}`;
    console.log('Sending get request to url: ' + url);
    const request = new Request(url, {
      method: 'GET',
      credentials: 'include'
    });
    return fetch(request)
      .then((response) => {
        if (response.status === 404) {
          return Promise.reject(404);
        } else if (response.status === 500) {
          return Promise.reject(500);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error.message);
      });
  }

  public post(path: string, data: FormData) {
    const url = `${this.otherUrlPrefix}/${path}`;
    console.log('Sending post request to url: ' + url);
    const request = new Request(url, {
      method: 'POST',
      credentials: 'include',
      body: data
    });

    return fetch(request)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.errors) {
          return Promise.reject(data.errors);
        } else {
          console.log(data);
          return data;
        }
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
      const apiPromise = options.type === 'get' ? this.get(url) : this.post(url, options.postData);

      apiPromise
        .then((json) => {
          resolve(json);
        })
        .catch(reject);
    });
  }
}
