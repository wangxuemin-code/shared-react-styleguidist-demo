import { faUserCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { WrapperContainer } from './WrapperContainer';
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
  logo?: string | boolean;
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

  addDefaultSrc(ev: any) {
    ev.target.src = 'some default image url';
  }

  public render() {
    const className: any = this.props.className;
    const logo =
      typeof this.props.logo === 'string'
        ? this.props.logo
        : this.props.logo
        ? className.includes('alt')
          ? 'data:image/png;base64,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'
          : 'data:image/png;base64,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'
        : '';
    return (
      <Container {...this.props}>
        <WrapperContainer display={'grid'}>
          <a href='/' className={styles.logoAnchor}>
            {this.props.logo && <Image src={logo} className={styles.icon} />}
          </a>
          <ul className={styles.links}>
            {this.props.mainLinks!.map((link, i) => {
              return this.getLinkDesign(link.title, link.path, link.selected, link.useAnchorTag);
            })}
          </ul>
          {this.props.userAction && this.getUserActionDesign()}
        </WrapperContainer>
      </Container>
    );
  }

  private getLinkDesign(title: string, href: string, selected?: boolean, useAnchorTag?: boolean) {
    return (
      <li key={href} className={selected ? 'selected' : ''}>
        {useAnchorTag && (
          <a href={href}>
            {title} dasdsd
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
              <Link key={sublink.path} useNormalAnchor={sublink.useAnchorTag} href={sublink.path}>
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
