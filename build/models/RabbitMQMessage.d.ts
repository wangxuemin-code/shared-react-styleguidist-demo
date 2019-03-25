export declare class RabbitMQMessage {
    private statusCode;
    private type;
    private error?;
    private data?;
    constructor(json: string);
    getData(): any;
    getType(): string;
    getStatusCode(): number;
    getError(): string | undefined;
    hasError(): boolean;
    getTxId(): any;
}
