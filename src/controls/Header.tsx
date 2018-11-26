import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Image } from './Image';

interface IHeader extends IContainer {
  fullWidth?: boolean;
}

export class Header extends React.Component<IHeader, any> {
  public render() {
    return (
      <Container {...this.props} className={styles.istoxHeader}>
        <Image src='images/icon.png' className={styles.icon} />
        <ul className={styles.links}>
          {this.getLinkDesign('Trade')}
          {this.getLinkDesign('Fundraise')}
          {this.getLinkDesign('Company')}
        </ul>
        <Container className={styles.userAction}>Login/Register</Container>
        <Container />
      </Container>
    );
  }

  private getLinkDesign(title: string) {
    return (
      <li>
        {title}
        <div className={styles.underline} />
      </li>
    );
  }
}
