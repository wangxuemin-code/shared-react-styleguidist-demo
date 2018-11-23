import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Alert as ReactAlert } from 'react-bootstrap';
import { Icon } from '.';

export interface IAlert extends IContainer {
  error?: string | string[];
  success?: string | string[];
  info?: string | string[];
}

export class Alert extends React.Component<IAlert, any> {
  public render() {
    if (!this.props.error && !this.props.success && !this.props.info) {
      return null;
    }

    if (Array.isArray(this.props.error) && this.arrayNotEmpty(this.props.error)) {
      return this.props.error.map((message: string) => this.getMessage('danger', message));
    } else if (Array.isArray(this.props.success) && this.arrayNotEmpty(this.props.success)) {
      return this.props.success.map((message: string) => this.getMessage('success', message));
    } else if (Array.isArray(this.props.info) && this.arrayNotEmpty(this.props.info)) {
      return this.props.info.map((message: string) => this.getMessage('info', message));
    }

    return (
      <div>
        {this.props.success && this.getMessage('success', this.props.success)}
        {this.props.error && this.getMessage('danger', this.props.error)}
        {this.props.info && this.getMessage('info', this.props.info)}
      </div>
    );
  }

  private arrayNotEmpty(messages: string[]): boolean {
    for (const i in messages) {
      if (messages[i] && 0 !== messages[i].length) {
        return true;
      }
    }
    return false;
  }

  private getMessage(type: 'success' | 'danger' | 'info', message: string | string[]) {
    if (!message || 0 === message.length || Array.isArray(message)) {
      return null;
    }

    let icon;
    switch (type) {
      case 'success':
        icon = 'ok-sign';
        break;
      case 'danger':
        icon = 'info-sign';
        break;
      case 'info':
        icon = 'info-sign';
        break;
    }

    return (
      <Container {...this.props} className={styles.istoxAlert}>
        <ReactAlert bsStyle={type}>
          <Icon icon={icon} className={styles.icon} />
          {message}
        </ReactAlert>
      </Container>
    );
  }
}
