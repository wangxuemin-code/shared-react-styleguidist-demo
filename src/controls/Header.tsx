import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Image } from './Image';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';
import * as Cookies from 'js-cookie';
import { Transition } from './Transition';
import { Link } from './Link';

interface IHeader extends IContainer {
  fullWidth?: boolean;
  currentPath?: string;
}

interface IState {
  showSubMenu: boolean;
}

export class Header extends React.Component<IHeader, IState> {
  constructor(props: IHeader) {
    super(props);

    this.state = { showSubMenu: false };
    this.showSubMenu = this.showSubMenu.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
  }

  public render() {
    return (
      <Container {...this.props} className={styles.istoxHeader}>
        <Image src='images/icon.png' className={styles.icon} />
        <ul className={styles.links}>
          {this.getLinkDesign('Wallet')}
          {this.getLinkDesign('Trade')}
          {this.getLinkDesign('STO')}
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
      <Container
        className={[styles.userAction, styles.afterLogin].join(' ')}
        onMouseEnter={this.showSubMenu}
        onMouseLeave={this.hideSubMenu}
      >
        <Icon icon={faUserCircle} padding={{ topPx: 2 }} />
        <Container className={styles.text}>
          <span>{this.getUsername()}</span>
        </Container>
        {this.state.showSubMenu && this.getSubMenuDesign()}
      </Container>
    );
  }

  private getUsername() {
    const accountEmail = Cookies.get('account');
    if (accountEmail) {
      return accountEmail.split('@')[0];
    } else {
      return 'Guest';
    }
  }

  private isAdmin() {
    const isAdmin = Cookies.get('isAdmin');
    return isAdmin;
  }

  private showSubMenu() {
    this.setState({ showSubMenu: true });
  }

  private hideSubMenu() {
    this.setState({ showSubMenu: false });
  }

  private getSubMenuDesign() {
    return (
      <Transition>
        <Container className={styles.subMenu}>
          {this.isAdmin() && (
            <Link useNormalAnchor href='admin'>
              Admin Panel
            </Link>
          )}
          <Link useNormalAnchor href=''>
            Manage Account
          </Link>
          <Link useNormalAnchor href=''>
            Settings
          </Link>
          <Link useNormalAnchor href='logout'>
            Logout
          </Link>
        </Container>
      </Transition>
    );
  }
}
