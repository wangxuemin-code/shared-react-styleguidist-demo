import { Client, Message, MQTTError } from 'paho-mqtt';

export interface IFilterTypes {
  type?: string;
  statusCode?: number;
  id?: string;
  data?: {};
}

export interface IMqttStartOptions {
  host: string;
  port?: number;
  clientId?: string;
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

interface IPromiseMap {
  [key: string]: Array<{
    resolve: (value?: Message | PromiseLike<Message>) => void;
    filter: IFilterTypes;
  }>;
}

interface ICallbackMap {
  [key: string]: Array<(message: string, rawMessage: Message) => void>;
}

interface IIndexMap {
  [key: string]: (message: string, rawMessage: Message) => void;
}

export class Mqtt {
  private client: Client;
  private options: IMqttStartOptions;
  private resolvesMap: IPromiseMap;
  private callbackMap: ICallbackMap;
  private indexMap: IIndexMap;
  private subscribeQueues: string[];
  private intervalId: any;
  private connected: boolean;

  public constructor(options?: IMqttStartOptions) {
    this.options = options || { host: 'localhost' };

    this.resolvesMap = {};
    this.callbackMap = {};
    this.indexMap = {};
    this.subscribeQueues = [];

    this.client = new Client(
      this.options.host,
      this.options.port || 15675,
      '/ws',
      this.options.clientId || 'clientId' + Math.random() * 1000
    );

    this.client.onConnectionLost = (responseObject) => {
      this.connected = false;
      if (this.options.onDisonnected) {
        this.options.onDisonnected(responseObject);
      }
    };

    this.client.onMessageArrived = (message) => {
      const destinationName = message.destinationName.replace(/\//gi, '.');
      if (this.resolvesMap[destinationName]) {
        const promiseObjects = this.resolvesMap[destinationName];
        const matchedPromiseObject: Array<{
          resolve: (value?: Message | PromiseLike<Message>) => void;
          filter: IFilterTypes;
        }> = [];
        const messageJson = JSON.parse(message.payloadString);

        promiseObjects.forEach((promiseObject) => {
          if (promiseObject.filter && Object.keys(promiseObject.filter).length > 0) {
            if (this.isContainedIn(promiseObject.filter, messageJson)) {
              matchedPromiseObject.push(promiseObject);
            }
          } else {
            matchedPromiseObject.push(promiseObject);
          }
        });

        for (const promiseObj of matchedPromiseObject) {
          promiseObj.resolve(message);
          this.deleteItemOrKey(this.resolvesMap, destinationName, promiseObj);
        }

        if (!this.callbackMap[destinationName] && !this.resolvesMap[destinationName]) {
          this.client.unsubscribe(destinationName);
          const index = this.subscribeQueues.indexOf(destinationName);
          if (index > 0) {
            this.subscribeQueues.splice(index, 1);
          }
        }
      }

      if (this.callbackMap[destinationName]) {
        const callbacks = this.callbackMap[destinationName];

        callbacks.forEach((callback) => {
          callback(message.payloadString, message);
        });
      }
    };

    this._connect();
  }

  private _connect() {
    this.client.connect({
      onSuccess: () => {
        this.connected = true;
        if (this.options.onConnected) {
          this.options.onConnected();
        }

        // need to ping the server every X seconds, X must be lower than keepAliveInterval
        // else mqtt will randomly disconnects
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
          this.send('PING', 'ping');
        }, 30 * 1000);

        // subscribe back to all queues
        this.subscribeQueues.forEach((queueName) => {
          this.client.subscribe(queueName);
        });
      },
      keepAliveInterval: 60,
      reconnect: true
    });
  }

  public subscribe(options: IOptions): ISubscription {
    const queueName = this.getQueueName(options);
    const uuid = this.getUUid();

    if (!this.callbackMap[queueName]) {
      if (this.connected) {
        this.client.subscribe(this.getQueueName(options));
      }
    }
    this.subscribeQueues.push(queueName);
    this.appendOrAddNewItem(false, this.callbackMap, queueName, options.callback, undefined);
    this.indexMap[uuid] = options.callback!;

    return { uuid, queueName };
  }

  public unsubscribe(subcription: ISubscription) {
    const callback = this.indexMap[subcription.uuid];
    if (callback) {
      const shouldUnsubscribe = this.deleteItemOrKey(
        this.callbackMap,
        subcription.queueName,
        callback
      );
      if (shouldUnsubscribe) {
        if (this.connected) {
          this.client.unsubscribe(subcription.queueName);
        }

        const index = this.subscribeQueues.indexOf(subcription.queueName);
        if (index > 0) {
          this.subscribeQueues.splice(index, 1);
        }
      }
    }

    delete this.indexMap[subcription.uuid];
  }

  public waitForMessage(options: IOptions): Promise<Message> {
    return new Promise<Message>((resolve) => {
      const queueName = this.getQueueName(options);
      this.appendOrAddNewItem(true, this.resolvesMap, queueName, resolve, options.filter);
      if (this.connected) {
        this.client.subscribe(queueName);
      }
      this.subscribeQueues.push(queueName);
    });
  }

  private getQueueName(options: IOptions) {
    return `${options.queueName}.${options.topic ? `.${options.topic}` : ''}`;
  }

  private appendOrAddNewItem(
    isPromise: boolean,
    map: IPromiseMap | ICallbackMap,
    key: string,
    item: any,
    filter?: IFilterTypes
  ) {
    let arr: any = [];
    if (map[key]) {
      arr = map[key];
    }

    if (isPromise) {
      arr.push({ resolve: item, filter });
    } else {
      arr.push(item);
    }

    map[key] = arr;
  }

  private deleteItemOrKey(map: ICallbackMap | IPromiseMap, key: string, item: any): boolean {
    if (map[key]) {
      const arr: any = map[key];
      const index = arr.indexOf(item);

      if (index != -1) {
        arr.splice(index, 1);
        if (arr.length > 0) {
          return false;
        } else {
          delete map[key];
          return true;
        }
      }
    }
    return false;
  }

  private getUUid(): string {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

  public send(routingKey: string, msg: string) {
    const message = new Message(msg);
    message.destinationName = routingKey;
    this.client.send(message);
  }

  private isContainedIn(a: any, b: any) {
    if (typeof a != typeof b) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length == 1) {
        var j = 0;
        while (j < b.length) {
          if (this.isContainedIn(a[0], b[j])) {
            return true;
          }
          j++;
        }
        return false;
      } else {
        var k = 0;
        while (k < a.length) {
          if (!this.isContainedIn([a[k]], b)) {
            return false;
          }
          k++;
        }
        return true;
      }
    } else if (Object(a) === a) {
      for (var p in a) if (!(p in b && this.isContainedIn(a[p], b[p]))) return false;
      return true;
    } else return a === b;
  }
}
