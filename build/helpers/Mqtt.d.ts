import { Message, MQTTError } from 'paho-mqtt';
export interface IFilterTypes {
    type?: string;
    statusCode?: number;
    id?: string;
    data?: {};
}
export interface IMqttStartOptions {
    host: string;
    port?: number;
    username?: string;
    password?: string;
    useSSL?: boolean;
    clientId?: string;
    path?: string;
    onConnected?: () => void;
    onDisonnected?: (responseObject: MQTTError) => void;
}
export interface IOptions {
    queueName: string;
    topic?: string;
    callback?: (message: string, rawMessage: Message) => void;
    filter?: IFilterTypes;
}
export interface ISubscription {
    uuid: string;
    queueName: string;
}
export declare class Mqtt {
    private client;
    private options;
    private resolvesMap;
    private callbackMap;
    private indexMap;
    private subscribeQueues;
    private intervalId;
    private connected;
    constructor(options?: IMqttStartOptions);
    private _connect;
    subscribe(options: IOptions): ISubscription;
    unsubscribe(subcription: ISubscription): void;
    waitForMessage(options: IOptions): Promise<Message>;
    private getQueueName;
    private appendOrAddNewItem;
    private deleteItemOrKey;
    private getUUid;
    send(routingKey: string, msg: string): void;
    private isContainedIn;
}
