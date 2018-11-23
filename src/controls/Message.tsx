import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from '.';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { stylings } from '../css/theme';

interface IProps extends IContainer {
  error?: string | 'icon-only';
  success?: string | 'icon-only';
  info?: string | 'icon-only';
}

export class Message extends React.Component<IProps, any> {
  public render() {
    let message: string;
    let type: 'success' | 'error' | 'info';
    if (this.props.error) {
      message = this.props.error;
      type = 'error';
    } else if (this.props.success) {
      message = this.props.success;
      type = 'success';
    } else if (this.props.info) {
      message = this.props.info;
      type = 'info';
    } else {
      return null;
    }

    const classes: string[] = [type, styles.istoxMessage];

    let icon;
    if (type === 'success') {
      icon = faCheckCircle;
    } else if (type === 'error') {
      icon = faTimesCircle;
    }

    return (
      <Container {...this.props} className={classes.join(' ')}>
        <Icon icon={icon} className={styles.icon} />
        <span>{message !== 'icon-only' && message}</span>
      </Container>
    );
  }
}
