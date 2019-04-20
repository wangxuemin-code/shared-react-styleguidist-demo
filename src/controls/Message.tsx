import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from '.';
import {
  faCheckCircle,
  faTimesCircle,
  faExclamation,
  faInfo,
  faInfoCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';

interface IMessage extends IContainer {
  icon?: any;
  message?: any;
  // success?: string | 'icon-only';
  // info?: string | 'icon-only';
  // warning?: string | 'icon-only';
  // error?: string | 'icon-only';
  outline?: boolean;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
}

export class Message extends React.Component<IMessage, any> {
  public static defaultProps: IMessage = {
    variant: 'default'
  };
  public render() {
    // let message: string;
    // let type: 'success' | 'error' | 'info' | 'warning';
    // if (this.props.error) {
    //   message = this.props.error;
    //   type = 'error';
    // } else if (this.props.success) {
    //   message = this.props.success;
    //   type = 'success';
    // } else if (this.props.info) {
    //   message = this.props.info;
    //   type = 'info';
    // } else if (this.props.warning) {
    //   message = this.props.warning;
    //   type = 'warning';
    // } else {
    //   return null;
    // }

    let classes: string[] = [
      styles.istoxMessage,
      this.props.variant || '',
      this.props.outline ? styles.outline : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    // let icon;
    // if (type === 'success') {
    //   icon = faCheckCircle;
    // } else if (type === 'error') {
    //   icon = faTimesCircle;
    // } else if (type === 'info') {
    //   icon = faInfoCircle;
    // } else if (type === 'warning') {
    //   icon = faExclamationCircle;
    // }

    return (
      <Container {...this.props} className={classes.join(' ')}>
        {this.props.icon && <Icon icon={this.props.icon} className={styles.icon} />}
        {this.props.message && (
          <Container className={this.props.icon ? styles.iconText : styles.messageOnly}>
            {this.props.message}
          </Container>
        )}
      </Container>
    );
  }
}
