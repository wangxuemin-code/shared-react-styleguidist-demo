import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from '.';

interface IMessage extends IContainer {
  icon?: any;
  message?: any;
  flat?: boolean;
  outline?: boolean;
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
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
      this.props.size === 'small' ? styles.smallMessage : ''
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
        {this.props.icon && <Icon size={'small'} icon={this.props.icon} />}
        {this.props.message && (
          <Container style={style} className={this.props.icon ? styles.iconText : ''}>
            {this.props.message}
          </Container>
        )}
      </Container>
    );
  }
}
