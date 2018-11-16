import * as React from 'react';
import * as styles from './css/Card.css';
import { Container, IContainer } from './Container';

interface IProps extends IContainer {
    children: any;
}

export class Card extends React.Component<IProps, any> {
    public render() {
      return (
          <Container {...this.props} className={styles.card}>
              {this.props.children}
          </Container>
        );
    }
}
