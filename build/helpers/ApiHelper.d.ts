interface IApiOptions {
    type: 'get' | 'post' | 'put' | 'patch' | 'delete';
    postData?: FormData;
}
export declare class ApiHelper {
    private getUrlPrefix;
    private otherUrlPrefix;
    constructor(GETPrefix: string, POSTPrefix: string);
    start(path: string, methodType: string, data?: FormData): Promise<any>;
    createSingleApi<T>(type: new () => T, url: string, options?: IApiOptions): Promise<T>;
    createArrayApi<T>(type: new () => T, url: string, key: string, options?: IApiOptions): Promise<T[]>;
    createVoidApi(url: string, options?: IApiOptions): Promise<void>;
    createApi(url: string, options?: IApiOptions): Promise<any>;
}
export {};
