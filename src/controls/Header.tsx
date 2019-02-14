import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Image } from './Image';
import { Link } from './Link';
import { Transition } from './Transition';
import { Controls } from '../index-prod';

type Paths = 'wallet' | 'trade' | 'project';

interface IHeader extends IContainer {
  fullWidth?: boolean;
  selectedPath?: Paths;
  useAnchorTag?: boolean;
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
          {this.getLinkDesign('Wallet', 'wallet')}
          {this.getLinkDesign('Trade', 'trade')}
          {this.getLinkDesign('Sto', 'project')}
        </ul>
        {this.getUserActionDesign()}
      </Container>
    );
  }

  private getLinkDesign(title: string, href: Paths) {
    return (
      <li className={href === this.props.selectedPath ? 'selected' : ''}>
        {this.props.useAnchorTag && (
          <a href={href}>
            {title}
            <div className={styles.underline} />
          </a>
        )}

        {!this.props.useAnchorTag && (
          <Controls.Link href={href}>
            {title}
            <div className={styles.underline} />
          </Controls.Link>
        )}
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
