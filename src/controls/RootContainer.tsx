import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

export class RootContainer extends React.Component<IContainer, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.istoxRoot}>
        {this.props.children}
      </Container>
    );
  }
}
