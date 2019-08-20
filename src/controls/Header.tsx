import { faUserCircle, faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons';
import * as Cookies from 'js-cookie';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { WrapperContainer } from './WrapperContainer';
import { Button } from './Button';
import { Icon } from './Icon';
import { Image } from './Image';
import { Link } from './Link';
import { Divider } from './Divider';
import { Modal } from './Modal';
import { Transition } from './Transition';
import { Controls } from '../index-prod';
import { Dropdown } from 'antd';
var uniqid = require('uniqid');

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
  link?: string;
  onClick?: () => void;
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
  onNotificationVisibleChanged?: (visible: boolean) => void;
}

interface IState {
  username: string;
  showSignOutModal: boolean;
}

export class Header extends React.Component<IHeader, IState> {
  public static defaultProps = {
    mainLinks: [],
    subLinks: []
  };

  constructor(props: IHeader) {
    super(props);
    this.state = { username: '', showSignOutModal: false };
  }

  public componentDidUpdate(prevProps: IHeader) {
    if (prevProps.username !== this.props.username && this.props.username) {
      this.setState({ username: this.props.username });
    }
  }

  addDefaultSrc(ev: any) {
    ev.target.src = 'some default image url';
  }

  public render() {
    const className: any = this.props.className;
    return (
      <Container display={'flex'} {...this.props}>
        <Modal visible={this.state.showSignOutModal} width={600}>
          <Divider visibility={'hidden'} />
          <Divider visibility={'hidden'} />
          <h3 className={'semi-bold color-dark text-center'}>Sign out iSTOX</h3>
          <Divider visibility={'hidden'} />
          <p className={'text-center large color-primary-grey-darker'}>
            Are you sure you want to sign out iSTOX?
          </p>
          <Divider visibility={'hidden'} />
          <Divider visibility={'hidden'} />
          <Container fluid={true}>
            <Container
              padding={{ allRem: 0.5714 }}
              float={'left'}
              textAlign={'center'}
              widthPercent={50}
            >
              <Link
                onClick={() => {
                  this.setState({ showSignOutModal: false });
                }}
              >
                Cancel
              </Link>
            </Container>
            <Button
              float={'right'}
              className={styles.logoutButton}
              variant='disabled'
              outline
              widthPercent={50}
              size={'large'}
              onClick={() => {
                this.setState({ showSignOutModal: false });
                window.location.href = '/logout';
              }}
            >
              Sign Out
            </Button>
          </Container>
          <Divider visibility={'hidden'} />
        </Modal>
        <WrapperContainer display={'flex'}>
          <a href='/' className={styles.logoAnchor}>
            {this.props.logo && (
              <Image
                variant={className && className.includes('alt') ? 'logo alt' : 'logo'}
                className={styles.icon}
              />
            )}
          </a>
          {!this.props.children && (
            <ul className={styles.links}>
              {this.props.mainLinks!.map((link, i) => {
                return this.getLinkDesign(link.title, link.path, link.selected, link.useAnchorTag);
              })}
            </ul>
          )}
          {this.props.children}
          {this.getUsername() && (
            <Container className={styles.right} verticalAlign='center'>
              {this.props.notifications && this.getNotificationDesign()}
              {this.props.userAction && this.getUserActionDesign()}
            </Container>
          )}
          {!this.getUsername() && (
            <Container className={styles.right} verticalAlign='center'>
              <div className='small'>Already have an account? </div>&nbsp; &nbsp;
              <a href='/login'>
                <Button size='small' variant={'secondary'} outline={className.includes('alt')}>
                  Sign In
                </Button>
              </a>
            </Container>
          )}
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
            {/* <div className={styles.underline} /> */}
          </Controls.Link>
        )}
        {useAnchorTag && (
          <Controls.Link useNormalAnchor href={href} underline={false}>
            {title}
            {/* <div className={styles.underline} /> */}
          </Controls.Link>
        )}
      </li>
    );
  }

  private getNotificationDesign() {
    return (
      <>
        <Dropdown
          overlay={this.getNotificationMenuDesign()}
          trigger={['click']}
          getPopupContainer={(trigger: any) => trigger.parentNode}
          onVisibleChange={this.props.onNotificationVisibleChanged}
        >
          <Container classNames={[styles.notificationIcon, 'ant-dropdown-link']}>
            <Icon size='small' icon={faBell} />
            {this.props.notificationUnread && <Container className={styles.notificationUnread} />}
          </Container>
        </Dropdown>
      </>
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
      <Container key={uniqid().toString()}>
        <h6>{singleNotification.header}</h6>
        {singleNotification &&
          singleNotification.notifications.map((notification: any) => (
            <Container key={uniqid().toString()}>
              <Container padding={{ topRem: 0.5 }} className={styles.uppercase}>
                <p>{notification.title}</p>
              </Container>
              {notification.contents!.map((item: INotificationItem) => {
                return this.getNotificationItemDesign(
                  item.icon,
                  item.content,
                  item.link,
                  item.onClick
                );
              })}
            </Container>
          ))}
        {showDivider && <Divider visibility={'hidden'} />}
      </Container>
    );
  }

  private getNotificationItemDesign(icon: any, content: any, link?: string, onClick?: () => void) {
    return (
      <Container
        key={uniqid().toString()}
        classNames={[styles.notification, styles.item, styles.basic]}
        onClick={onClick}
      >
        {icon}
        <Container className={styles.itemInfo}>{content}</Container>
      </Container>
    );
  }

  private getUserActionDesign() {
    return (
      <Dropdown
        overlay={this.getSubMenuDesign()}
        trigger={['click']}
        getPopupContainer={(trigger: any) => trigger.parentNode}
      >
        <Container classNames={[styles.userAction, styles.afterLogin, 'ant-dropdown-link']}>
          <Icon className={styles.userIcon} icon={faUserCircle} />
          <Container className={styles.text}>
            <Container>
              <Container className={styles.headerUsername}>{this.getUsername()}</Container>
              <Container className={styles.headerEmail}>{this.getUserEmail()}</Container>
            </Container>
            {((this.props.subLinks && this.props.subLinks.length) ||
              Cookies.get('account') ||
              this.state.username !== '') && (
              <>
                &nbsp; <Icon icon={faChevronDown} padding={{ leftRem: 1 }} />
              </>
            )}
          </Container>
        </Container>
      </Dropdown>
    );
  }

  private getUsername() {
    const accountEmail = Cookies.get('account');
    if (accountEmail) {
      return accountEmail.split('@')[0];
    } else if (this.state.username !== '') {
      return this.state.username;
    } else {
      return false;
    }
  }

  private getUserEmail() {
    const accountEmail = Cookies.get('account');
    if (accountEmail) {
      return accountEmail.toLowerCase();
    } else {
      return false;
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
            <Container
              padding={{ topBottomRem: 0.5, leftRightRem: 1 }}
              textAlign='left'
              classNames={[styles.colorDanger, styles.cursorPointer]}
              onClick={() => {
                this.setState({ showSignOutModal: true });
              }}
            >
              Sign Out
            </Container>
          )}
        </Container>
      </Transition>
    );
  }
}
