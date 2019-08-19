import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from '.';

interface IMessage extends IContainer {
  labeled?: boolean;
  icon?: any;
  message?: any;
  flat?: boolean;
  outline?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'disabled'
    | 'success'
    | 'warning'
    | 'danger'
    | 'error';
  messageColor?: string;
  size?: 'small' | 'normal';
}

export class Message extends React.Component<IMessage, any> {
  public static defaultProps: IMessage = {
    variant: 'primary',
    size: 'normal'
  };
  public render() {
    let classes: string[] = [
      styles.istoxMessage,
      this.props.variant || '',
      this.props.outline ? styles.outline : '',
      this.props.flat ? styles.flat : '',
      this.props.size === 'small' ? styles.smallMessage : '',
      this.props.labeled ? styles.labeled : '',
      this.props.variant === 'error' ? styles.danger : ''
    ];

    classes = classes.filter(function(el) {
      return el != '';
    });

    let style: React.CSSProperties = this.props.style || {};

    if (this.props.messageColor) {
      style.color = this.props.messageColor;
    }

    return (
      <Container {...this.props} className={classes.join(' ')}>
        {this.props.labeled && this.props.icon && (
          <Container style={style} className={styles.label}>
            <Icon size={'small'} icon={this.props.icon} />
          </Container>
        )}
        {this.props.message && (
          <Container style={style} className={styles.content}>
            {!this.props.labeled && this.props.icon && (
              <Icon size={'small'} icon={this.props.icon} />
            )}
            {this.props.message}
          </Container>
        )}
      </Container>
    );
  }
}
