import { Message } from 'paho-mqtt';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IFilterTypes, Mqtt } from '../helpers';
import { Container } from './Container';
import * as styles from '../css/main.scss';
import { Image } from './Image';
import { RabbitMQMessage } from '../models/RabbitMQMessage';

interface IProps {
  mqttClient: Mqtt;
  waitOptions: {
    queueName: string;
    topicName?: string;
    filter?: IFilterTypes;
  };
  onSucess?: (rabbitMqMessage: RabbitMQMessage, message: Message) => void;
  onError?: (error: string, rabbitMqMessage: RabbitMQMessage, message: Message) => void;
}

interface IState {
  hiding: boolean;
  showing: boolean;
}

export class BlockchainTransaction extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = { showing: false, hiding: false };
    this.onExited = this.onExited.bind(this);
  }

  public componentWillMount() {
    this.props.mqttClient
      .waitForMessage({
        queueName: this.props.waitOptions.queueName,
        topic: this.props.waitOptions.topicName,
        filter: this.props.waitOptions.filter
      })
      .then((message) => {
        this.startExit();
        const rabbitMqMessage = new RabbitMQMessage(message.payloadString);
        if (rabbitMqMessage.hasError()) {
          if (this.props.onError)
            this.props.onError(
              rabbitMqMessage.getError() || 'Unknown error.',
              rabbitMqMessage,
              message
            );
        } else {
          if (this.props.onSucess) this.props.onSucess(rabbitMqMessage, message);
        }
      });
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({ showing: true });
    }, 10);
  }

  public render() {
    return (
      <Container
        classNames={[
          styles.blockchainTransactionContainer,
          this.state.showing ? styles.slideIn : '',
          this.state.hiding ? styles.slideOut : ''
        ]}
      >
        <Image src={'images/mining.gif'} width={40} margin={{ rightPx: 10 }} />
        Interacting with blockchain...
      </Container>
    );
  }

  private startExit() {
    this.setState({ hiding: true, showing: false });
    setTimeout(() => {
      this.onExited();
    }, 500);
  }

  private onExited() {
    const target = document.getElementById(
      this.props.waitOptions.queueName + this.props.waitOptions.topicName
    );
    if (target && target.parentNode) {
      unmountComponentAtNode(target);
      target.parentNode.removeChild(target);
    }
  }

  private static createElementReconfirm(props: IProps) {
    let divTarget: HTMLElement = document.createElement('div');
    divTarget.id = props.waitOptions.queueName + props.waitOptions.topicName;
    divTarget.style.position = 'relative';
    divTarget.style.zIndex = '10000';
    document.body.appendChild(divTarget);
    render(<BlockchainTransaction {...props} />, divTarget);
  }

  public static show(props: IProps) {
    this.createElementReconfirm(props);
  }
}
