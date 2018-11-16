import * as React from 'react';
import * as styles from '../css/Global.css';
import * as imageStyles from './css/Image.css';
import { Container, IContainer } from './Container';

interface IImage extends IContainer {
  fullWidth?: boolean;
  src: string;
  width?: number;
  height?: number;
}

export class Image extends React.Component<IImage, any> {
  public render() {
    const classes: string[] = [imageStyles.image];
    if (this.props.fullWidth) {
      classes.push(styles.fullWidth);
    }

    const style: React.CSSProperties = {};
    if (this.props.width) {
      style.width = this.props.width;
    }

    if (this.props.height) {
      style.height = this.props.height;
    }

    return (
      <Container {...this.props}>
        <img style={style} className={classes.join(' ')} src={this.props.src} />
      </Container>
    );
  }
}
