import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from '.';

interface ILabel extends IContainer {
  text?: any;
  variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'light' | 'dark' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'normal';
}

export class Label extends React.Component<ILabel, any> {
  public static defaultProps: ILabel = {
    variant: 'primary',
    size: 'normal'
  };
  public render() {
    let classes: string[] = [
      styles.istoxLabel,
      this.props.variant || '',
      this.props.size === 'small' ? styles.smallMessage : ''
    ];

    let style: React.CSSProperties = this.props.style || {};

    return (
      <Container {...this.props} className={classes.join(' ')}>
        {this.props.text}
      </Container>
    );
  }
}
