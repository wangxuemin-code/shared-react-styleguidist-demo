import * as React from 'react';
import { MyComponent } from './MyComponent';
import { Container, IContainer } from './Container';
import { Image } from './Image';
import * as styles from '../css/main.scss';
import { Icon } from './Icon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface IProps extends IContainer {
  type: '404' | '500';
  message?: string;
}

export class ErrorPage extends MyComponent<IProps, any> {
  public render() {
    return (
      <Container className={styles.errorPage}>
        <Image
          src={this.props.type === '404' ? 'images/404.png' : 'images/500.png'}
          alt={<Icon className={styles.altIcon} icon={faExclamationTriangle} />}
        />
        <Container className={styles.message}>{this.props.message}</Container>
      </Container>
    );
  }
}
