interface IError {
    message: string;
    type: 'Empty' | 'Unknown' | 'NotAuthorizedOrNetworkIssue' | 'NoPrivilege';
}
export declare class ErrorHandle {
    static formatError(error?: any): IError;
    private static formatApolloError;
    private static formatOtherError;
}
export {};
