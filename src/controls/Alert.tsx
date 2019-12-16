import * as React from 'react';
import * as styles from '../css/main.scss';
import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, IContainer, Message, Transition } from '.';
import { UuidGenerator } from '../helpers';

export interface IAlert extends IContainer {
  error?: string | string[];
  success?: string | string[];
  info?: string | string[];
}

interface IState {
  error?: string | string[];
  success?: string | string[];
  info?: string | string[];
  showing: boolean;
}

export class Alert extends React.Component<IAlert, IState> {
  constructor(props: IAlert) {
    super(props);
    this.state = {
      error: this.props.error,
      success: this.props.success,
      info: this.props.info,
      showing:
        this.isset(this.props.success) || this.isset(this.props.error) || this.isset(this.props.info) ? true : false
    };
  }

  componentDidUpdate(prevProps: IAlert) {
    let success: string | string[] = '';
    let error: string | string[] = '';
    let info: string | string[] = '';

    if (this.props === prevProps) {
      return;
    }

    if ((Array.isArray(this.props.success) && this.arrayNotEmpty(this.props.success)) || this.props.success) {
      success = this.props.success;
    }
    if ((Array.isArray(this.props.error) && this.arrayNotEmpty(this.props.error)) || this.props.error) {
      error = this.props.error;
    }
    if ((Array.isArray(this.props.info) && this.arrayNotEmpty(this.props.info)) || this.props.info) {
      info = this.props.info;
    }

    if (this.isset(success) || this.isset(error) || this.isset(info)) {
      this.setState({
        success: success,
        error: error,
        info: info,
        showing: true
      });
    } else {
      if (this.state.showing) {
        this.setState({ showing: false });
      }
    }
  }

  public render() {
    return <Transition in={this.state.showing}>{this.getContent()}</Transition>;
  }

  private getContent() {
    if (Array.isArray(this.state.error) && this.arrayNotEmpty(this.state.error)) {
      return this.state.error.map((message: string) => this.getMessage('error', message));
    } else if (Array.isArray(this.state.success) && this.arrayNotEmpty(this.state.success)) {
      return this.state.success.map((message: string) => this.getMessage('success', message));
    } else if (Array.isArray(this.state.info) && this.arrayNotEmpty(this.state.info)) {
      return this.state.info.map((message: string) => this.getMessage('info', message));
    } else {
      if (this.state.success) return this.getMessage('success', this.state.success);
      if (this.state.error) return this.getMessage('error', this.state.error);
      if (this.state.info) return this.getMessage('info', this.state.info);
    }
  }

  private arrayNotEmpty(messages: string[]): boolean {
    for (const i in messages) {
      if (messages[i] && 0 !== messages[i].length) {
        return true;
      }
    }
    return false;
  }

  private isset(message?: string[] | string): boolean {
    if (Array.isArray(message)) {
      return this.arrayNotEmpty(message);
    } else {
      return message ? true : false;
    }
  }

  private getMessage(
    type: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'error',
    message: string | string[]
  ) {
    if (!message || 0 === message.length || Array.isArray(message)) {
      return null;
    }

    let icon;
    switch (type) {
      case 'success':
        icon = faCheckCircle;
        break;
      case 'error':
        icon = faInfoCircle;
        break;
      case 'info':
        icon = faInfoCircle;
        break;
    }

    return (
      <Container key={UuidGenerator.generate()} {...this.props} className={styles.istoxAlert}>
        <Message justifyContent={'left'} flat fluid variant={type} icon={icon} message={message} />
      </Container>
    );
  }
}
