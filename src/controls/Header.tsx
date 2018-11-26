import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Image } from './Image';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';

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
        {this.getUserActionDesign()}
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

  private getUserActionDesign() {
    return (
      // <Container className={styles.userAction}>Login / Register</Container>
      <Container className={[styles.userAction, styles.afterLogin].join(' ')}>
        <Icon icon={faUserCircle} padding={{ topPx: 2 }} />
        <Container className={styles.text}>Joseph</Container>
      </Container>
    );
  }
}
