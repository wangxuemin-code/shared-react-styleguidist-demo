import { faUserCircle, faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { WrapperContainer } from './WrapperContainer';
import { Icon } from './Icon';
import { Image } from './Image';
import { Link } from './Link';
import { Divider } from './Divider';
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

interface INotifications {
  header?: string;
  notifications?: INotification[];
}

interface INotification {
  title?: string;
  contents?: INotificationItem[];
}

interface INotificationItem {
  icon?: any;
  content?: any;
}

interface IHeader extends IContainer {
  fullWidth?: boolean;
  mainLinks?: IMainLink[];
  subLinks?: ISubLink[];
  className?: string;
  logo?: string | boolean;
  notificationUnread?: boolean;
  notifications?: INotifications[];
  userAction?: boolean;
  username?: string;
}

interface IState {
  showSubMenu: boolean;
  showNotificationMenu: boolean;
  username: string;
}

export class Header extends React.Component<IHeader, IState> {
  private subMenu?: any;
  private notificationMenu?: any;
  public static defaultProps = {
    mainLinks: [],
    subLinks: []
  };

  constructor(props: IHeader) {
    super(props);
    this.state = { showSubMenu: false, showNotificationMenu: false, username: '' };
  }

  public componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  public componentDidUpdate(prevProps: IHeader) {
    if (prevProps.username !== this.props.username && this.props.username) {
      this.setState({ username: this.props.username });
    }
  }

  handleClick = (e: any) => {
    if (this.subMenu.contains(e.target)) {
      return;
    } else {
      this.setState({ showSubMenu: false });
    }
    if (this.notificationMenu.contains(e.target)) {
      return;
    } else {
      this.setState({ showNotificationMenu: false });
    }
  };

  toggleNotification() {
    if (this.state.showNotificationMenu) {
      this.setState({ showNotificationMenu: false });
    } else {
      this.setState({ showNotificationMenu: true });
    }
  }

  toggleUserAction() {
    if (this.state.showSubMenu) {
      this.setState({ showSubMenu: false });
    } else {
      this.setState({ showSubMenu: true });
    }
  }

  addDefaultSrc(ev: any) {
    ev.target.src = 'some default image url';
  }

  public render() {
    const className: any = this.props.className;
    return (
      <Container display={'flex'} {...this.props}>
        <WrapperContainer display={'flex'}>
          {this.props.children}
          {!this.props.children && (
            <a href='/' className={styles.logoAnchor}>
              {this.props.logo && (
                <Image
                  variant={className && className.includes('alt') ? 'logo alt' : 'logo'}
                  className={styles.icon}
                />
              )}
            </a>
          )}
          <ul className={styles.links}>
            {this.props.mainLinks!.map((link, i) => {
              return this.getLinkDesign(link.title, link.path, link.selected, link.useAnchorTag);
            })}
          </ul>
          {this.props.notifications && this.getNotificationDesign()}
          {this.props.userAction && this.getUserActionDesign()}
        </WrapperContainer>
      </Container>
    );
  }

  private getLinkDesign(title: string, href: string, selected?: boolean, useAnchorTag?: boolean) {
    return (
      <li key={href} className={selected ? 'selected' : ''}>
        {!useAnchorTag && (
          <Controls.Link href={href} underline={false}>
            {title}
            <div className={styles.underline} />
          </Controls.Link>
        )}
        {useAnchorTag && (
          <Controls.Link useNormalAnchor href={href} underline={false}>
            {title}
            <div className={styles.underline} />
          </Controls.Link>
        )}
      </li>
    );
  }

  private getNotificationDesign() {
    return (
      <div ref={(node) => (this.notificationMenu = node)}>
        <Container onClick={() => this.toggleNotification()} className={styles.notificationIcon}>
          <Icon size='large' icon={faBell} />
          {this.props.notificationUnread && <Container className={styles.notificationUnread} />}
          {this.state.showNotificationMenu && this.getNotificationMenuDesign()}
        </Container>
      </div>
    );
  }

  private getNotificationMenuDesign() {
    const allNotifications: any = this.props.notifications || [];
    let count = 0;
    return (
      <Transition>
        <Container className={styles.notificationMenu}>
          {allNotifications.map((singleNotification: any) => {
            count++;
            return this.getSingleNotificationDesign(
              singleNotification,
              count !== allNotifications.length
            );
          })}
        </Container>
      </Transition>
    );
  }

  private getSingleNotificationDesign(singleNotification: any, showDivider: boolean) {
    return (
      <Container>
        <h6>{singleNotification.header}</h6>
        {singleNotification &&
          singleNotification.notifications.map((notification: any) => (
            <Container>
              <Container padding={{ topRem: 0.5 }} className={styles.uppercase}>
                <p>{notification.title}</p>
              </Container>
              {notification.contents!.map((item: any) => {
                return this.getNotificationItemDesign(item.icon, item.content);
              })}
            </Container>
          ))}
        {showDivider && <Divider visibility={'hidden'} />}
      </Container>
    );
  }

  private getNotificationItemDesign(icon: any, content: any) {
    return (
      <Container classNames={[styles.notification, styles.item, styles.basic]}>
        {icon}
        <Container className={styles.itemInfo}>{content}</Container>
      </Container>
    );
  }

  private getUserActionDesign() {
    return (
      <div ref={(node) => (this.subMenu = node)}>
        <Container
          onClick={() => this.toggleUserAction()}
          className={[styles.userAction, styles.afterLogin].join(' ')}
        >
          <Icon size='large' icon={faUserCircle} />
          <Container className={styles.text}>
            {this.props.username || this.state.username || this.getUsername()}
            {((this.props.subLinks && this.props.subLinks.length) ||
              Cookies.get('account') ||
              this.state.username !== '') && (
              <>
                &nbsp; <Icon icon={faChevronDown} padding={{ leftRem: 1 }} />
              </>
            )}
          </Container>
          {this.state.showSubMenu && this.getSubMenuDesign()}
        </Container>
      </div>
    );
  }

  private getUsername() {
    const accountEmail = Cookies.get('account');
    if (accountEmail) {
      return accountEmail.split('@')[0];
    } else if (this.state.username !== '') {
      return this.state.username;
    } else {
      return 'Guest';
    }
  }

  private getSubMenuDesign() {
    return (
      <Transition>
        <Container className={styles.subMenu}>
          {this.props.subLinks &&
            this.props.subLinks.map((sublink) => (
              <Link
                underline={false}
                key={sublink.path}
                useNormalAnchor={sublink.useAnchorTag}
                href={sublink.path}
              >
                {sublink.title}
              </Link>
            ))}
          {Cookies.get('account') && (
            <Link underline={false} useNormalAnchor href='/logout'>
              Logout
            </Link>
          )}
        </Container>
      </Transition>
    );
  }
}
