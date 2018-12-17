export class RabbitMQMessage {
  private statusCode: number;
  private type: string;
  private error?: string;
  private data?: any;

  constructor(json: string) {
    const obj = JSON.parse(json);
    this.statusCode = obj.statusCode;
    this.type = obj.type;
    this.error = obj.error;
    this.data = obj.data;
  }
}
