import { Client, Message, MQTTError, SubscribeOptions, UnsubscribeOptions } from 'paho-mqtt';

export interface MqttOptions {
  host: string;
  port?: number;
  clientId?: string;
  onConnected?: () => void;
  onDisonnected?: (responseObject: MQTTError) => void;
  onNewMessage?: (text: string, message: Message) => void;
}

export class Mqtt {
  private client: Client;
  private options: MqttOptions;

  public start(options?: MqttOptions) {
    this.options = options || { host: 'localhost' };

    this.client = new Client(
      this.options.host,
      this.options.port || 15675,
      '/ws',
      this.options.clientId || 'clientId' + Math.random() * 1000
    );

    this.client.onConnectionLost = responseObject => {
      if (this.options.onDisonnected) {
        this.options.onDisonnected(responseObject);
      }
    };

    this.client.onMessageArrived = message => {
      if (this.options.onNewMessage) {
        this.options.onNewMessage(message.payloadString, message);
      }
    };

    this._connect();
  }

  private _connect() {
    this.client.connect({
      onSuccess: () => {
        if (this.options.onConnected) {
          this.options.onConnected();
        }
      },
      keepAliveInterval: 0,
      reconnect: true
    });
  }

  public subscribe(routingKey: string, subscribeOptions?: SubscribeOptions) {
    this.client.subscribe(routingKey, subscribeOptions);
  }

  public unsubscribe(routingKey: string, unsubscribeOptions?: UnsubscribeOptions) {
    this.client.unsubscribe(routingKey, unsubscribeOptions);
  }

  public send(routingKey: string, msg: string) {
    const message = new Message(msg);
    message.destinationName = routingKey;
    this.client.send(message);
  }
}
