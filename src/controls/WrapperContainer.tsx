import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from '.';

export class WrapperContainer extends React.Component<IContainer, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.istoxWrapper}>
        {this.props.children}
      </Container>
    );
  }
}
