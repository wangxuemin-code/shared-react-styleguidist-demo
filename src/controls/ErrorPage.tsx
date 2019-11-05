import * as React from 'react';
import * as styles from '../css/main.scss';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Icon, Image, Container, IContainer } from '.';
import { MyComponent } from './MyComponent';

interface IProps extends IContainer {
  type: '404' | '500';
  message?: string;
}

export class ErrorPage extends MyComponent<IProps, any> {
  public render() {
    return (
      <Container className={styles.errorPage}>
        <Image
          src={this.props.type === '404' ? 'images/404.gif' : 'images/500.gif'}
          alt={<Icon className={styles.altIcon} icon={faExclamationTriangle} />}
        />
        <Container className={styles.message}>{this.props.message}</Container>
      </Container>
    );
  }
}
