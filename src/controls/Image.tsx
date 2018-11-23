import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IImage extends IContainer {
  fullWidth?: boolean;
  src: string;
}

export class Image extends React.Component<IImage, any> {
  public render() {
    const classes: string[] = [styles.imageResponsive];

    return (
      <Container {...this.props}>
        <img className={classes.join(' ')} src={this.props.src} />
      </Container>
    );
  }
}
