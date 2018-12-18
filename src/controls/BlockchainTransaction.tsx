import { Message } from 'paho-mqtt';
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { IFilterTypes, Mqtt } from '../helpers';
import { Container } from './Container';
import * as styles from '../css/main.scss';
import { Image } from './Image';
import { RabbitMQMessage } from '../models/RabbitMQMessage';
import { Icon } from './Icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from './Link';

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
  succeed: boolean;
  txId?: string;
}

export class BlockchainTransaction extends React.Component<IProps, IState> {
  private timeout: any;

  public constructor(props: IProps) {
    super(props);
    this.state = { showing: false, hiding: false, succeed: false, txId: '' };
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
        const rabbitMqMessage = new RabbitMQMessage(message.payloadString);
        if (rabbitMqMessage.hasError()) {
          if (this.props.onError)
            this.props.onError(
              rabbitMqMessage.getError() || 'Unknown error.',
              rabbitMqMessage,
              message
            );
          this.startExit();
        } else {
          if (this.props.onSucess) this.props.onSucess(rabbitMqMessage, message);

          this.setState({ succeed: true, txId: rabbitMqMessage.getTxId() });
        }
      });
  }

  public componentDidUpdate(_: IProps, prevState: IState) {
    if (this.state.succeed && prevState.succeed !== this.state.succeed) {
      this.startExitCountdown();
    }
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
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
      >
        <Container classNames={[styles.content, this.state.succeed ? styles.invi : '']}>
          <Image
            src={'images/mining.gif'}
            width={40}
            margin={{ rightPx: 10 }}
            display='inline-block'
          />
          Interacting with blockchain...
        </Container>

        <Container classNames={[styles.content, !this.state.succeed ? styles.invi : '']}>
          <Icon icon={faCheck} margin={{ rightPx: 20 }} />
          {this.state.succeed && this.state.txId && (
            <React.Fragment>
              <span>Transaction {this.state.txId} executed successfully</span>
              <Link margin={{ leftPx: 20 }}>Show</Link>
            </React.Fragment>
          )}
          {this.state.succeed && !this.state.txId && (
            <span>Blockchain transaction is executed successfully</span>
          )}
        </Container>
      </Container>
    );
  }

  private onMouseEnter() {
    this.cancelExitCountdown();
  }

  private onMouseLeave() {
    this.startExitCountdown();
  }

  private startExitCountdown() {
    this.timeout = setTimeout(() => {
      this.startExit();
    }, 3000);
  }

  private cancelExitCountdown() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
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
