import * as React from 'react';
import * as styles from '../css/Global.css';
import * as messageStyles from './css/Message.css';
import { Container, IContainer } from './Container';
import { Alert } from 'react-bootstrap';
import { Icon } from '.';

export interface IProps extends IContainer {
  danger?: string | string[];
  success?: string | string[];
  info?: string | string[];
}

export class Message extends React.Component<IProps, any> {
  public render() {
    if (!this.props.danger && !this.props.success && !this.props.info) {
      return null;
    }

    if (Array.isArray(this.props.danger) && this.arrayNotEmpty(this.props.danger)) {
      return this.props.danger.map((message: string) => this.getMessage('danger', message));
    } else if (Array.isArray(this.props.success) && this.arrayNotEmpty(this.props.success)) {
      return this.props.success.map((message: string) => this.getMessage('success', message));
    } else if (Array.isArray(this.props.info) && this.arrayNotEmpty(this.props.info)) {
      return this.props.info.map((message: string) => this.getMessage('info', message));
    }

    return (
      <div>
        {this.props.success && this.getMessage('success', this.props.success)}
        {this.props.danger && this.getMessage('danger', this.props.danger)}
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
      <Container {...this.props}>
        <Alert className={messageStyles.message} bsStyle={type}>
          <Icon iconType='glyphicon' icon={icon} margin={{ right: 10 }} />
          {message}
        </Alert>
      </Container>
    );
  }
}
