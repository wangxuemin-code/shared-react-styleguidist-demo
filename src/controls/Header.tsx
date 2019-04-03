import { faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { Icon } from './Icon';
import { Image } from './Image';
import { Link } from './Link';
import { Transition } from './Transition';
import { Controls } from '../index-prod';

interface IMainLink {
  title: string;
  path: string;
  selected?: boolean;
  useAnchorTag?: boolean;
}

interface ISubLink {
  title: string;
  path: string;
  useAnchorTag?: boolean;
}

interface IHeader extends IContainer {
  fullWidth?: boolean;
  mainLinks?: IMainLink[];
  subLinks?: ISubLink[];
  className?: string;
  logo: string;
  userAction?: boolean;
}

interface IState {
  showSubMenu: boolean;
}

export class Header extends React.Component<IHeader, IState> {
  public static defaultProps = {
    mainLinks: [],
    subLinks: []
  };

  constructor(props: IHeader) {
    super(props);

    this.state = { showSubMenu: false };
    this.showSubMenu = this.showSubMenu.bind(this);
  }

  toggleClass() {
    const currentState = this.state.showSubMenu;
    this.setState({ showSubMenu: !currentState });
  }

  public render() {
    return (
      <Container {...this.props}>
        <a href='/' className={styles.logoAnchor}>
          <Image src={this.props.logo} className={styles.icon} />
        </a>
        <ul className={styles.links}>
          {this.props.mainLinks!.map((link) => {
            return this.getLinkDesign(link.title, link.path, link.selected, link.useAnchorTag);
          })}
        </ul>
        {this.props.userAction && this.getUserActionDesign()}
      </Container>
    );
  }

  private getLinkDesign(title: string, href: string, selected?: boolean, useAnchorTag?: boolean) {
    return (
      <li key={href} className={selected ? 'selected' : ''}>
        {useAnchorTag && (
          <a href={href}>
            {title}
            <div className={styles.underline} />
          </a>
        )}

        {!useAnchorTag && (
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
        onClick={() => this.toggleClass()}
        className={[styles.userAction, styles.afterLogin].join(' ')}
      >
        <Icon icon={faUserCircle} padding={{ topPx: 1 }} />
        <Container className={styles.text}>
          <span>{this.getUsername()}</span>
          <Icon icon={faChevronDown} padding={{ topPx: 1, leftPx: 15 }} />
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
          {this.props.subLinks &&
            this.props.subLinks.map((sublink) => (
              <Link useNormalAnchor={sublink.useAnchorTag} href={sublink.path}>
                {sublink.title}
              </Link>
            ))}
          <Link useNormalAnchor href='/logout'>
            Logout
          </Link>
        </Container>
      </Transition>
    );
  }
}
