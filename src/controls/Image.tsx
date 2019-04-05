import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';

interface IImage extends IContainer {
  fullWidth?: boolean;
  src?: string;
  alt?: any;
  variant?: 'logo' | 'logo alt';
}

interface IState {
  showAlt: boolean;
}

export class Image extends React.Component<IImage, IState> {
  constructor(props: IImage) {
    super(props);

    this.state = { showAlt: false };
    this.onError = this.onError.bind(this);
  }

  public render() {
    const classes: string[] = [styles.imageResponsive];
    let src = this.props.src;
    switch (this.props.variant) {
      case 'logo':
        src = '/images/ISTOX_Logo.png';
        break;
      case 'logo alt':
        src = '/images/ISTOX_Logo_Alt.png';
        break;
    }
    return (
      <Container {...this.props}>
        {this.state.showAlt && this.props.alt}
        {!this.state.showAlt && (
          <img onError={this.onError} className={classes.join(' ')} src={src} />
        )}
      </Container>
    );
  }

  public onError() {
    if (this.props.alt) {
      this.setState({ showAlt: true });
    }
  }
}
