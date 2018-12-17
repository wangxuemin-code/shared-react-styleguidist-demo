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

  public getData() {
    return this.data;
  }

  public getType() {
    return this.type;
  }

  public getStatusCode() {
    return this.statusCode;
  }

  public getError() {
    return this.error;
  }

  public hasError(): boolean {
    return this.statusCode !== 0;
  }
}
