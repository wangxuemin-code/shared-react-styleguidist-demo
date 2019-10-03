import { faChevronDown, faBell } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
import * as styles from '../css/main.scss';
import { Container, IContainer } from './Container';
import { WrapperContainer } from './WrapperContainer';
import { Button } from './Button';
import { Icon } from './Icon';
import { Image } from './Image';
import { Divider } from './Divider';
import { Transition } from './Transition';
import { Link } from './Link';
import { Dropdown } from 'antd';
var uniqid = require('uniqid');

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
  mainLinks?: any;
  subLinks?: any;
  className?: string;
  logo?: string | boolean;
  notificationUnread?: boolean;
  notifications?: INotifications[];
  userAction?: boolean;
  name?: string;
  email?: string;
  onNotificationVisibleChanged?: (visible: boolean) => void;
}

interface IState {
  name: string;
  email: string;
  subMenuVisible: boolean;
}

export class Header extends React.Component<IHeader, IState> {
  public static defaultProps = {
    mainLinks: [],
    subLinks: []
  };

  constructor(props: IHeader) {
    super(props);
    this.state = {
      name: this.props.name!,
      email: this.props.email!,
      subMenuVisible: false
    };
  }

  public componentDidUpdate(prevProps: IHeader) {
    if (prevProps.name !== this.props.name && this.props.name) {
      this.setState({ name: this.props.name });
    }
    if (prevProps.email !== this.props.email && this.props.email) {
      this.setState({ email: this.props.email });
    }
  }

  public render() {
    const className: any = this.props.className;
    return (
      <Container display={'flex'} {...this.props}>
        <WrapperContainer display={'flex'}>
          {this.props.logo && (
            <Link className={styles.logoAnchor} href={'/'} underline={false}>
              <Image
                variant={className && className.includes('alt') ? 'logo alt' : 'logo'}
                className={styles.icon}
              />
            </Link>
          )}
          <Container className={styles.links}>
            {this.props.mainLinks!.map((link: any, i: number) => (
              <Container key={i}>{link}</Container>
            ))}
          </Container>
          {this.props.userAction && (
            <Container
              onMouseDown={(e: any) => {
                e.preventDefault();
                return false;
              }}
              className={styles.right}
              verticalAlign='center'
            >
              {/* {this.props.notifications && this.getNotificationDesign()} */}
              {this.props.userAction && this.getUserActionDesign()}
            </Container>
          )}
          {!this.props.userAction && (
            <Container className={styles.right} verticalAlign='center'>
              <div className='small plablet-hidden'>Already have an account? </div>&nbsp; &nbsp;
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
          <Link href={href} underline={false}>
            {title}
            {/* <div className={styles.underline} /> */}
          </Link>
        )}
        {useAnchorTag && (
          <Link useNormalAnchor href={href} underline={false}>
            {title}
            {/* <div className={styles.underline} /> */}
          </Link>
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
    const className: any = this.props.className;
    return (
      <Dropdown
        overlay={this.getSubMenuDesign()}
        getPopupContainer={(trigger: any) => trigger.parentNode}
        visible={this.state.subMenuVisible}
        trigger={['click']}
        onVisibleChange={this.subMenuStatus}
      >
        <Container
          onClick={this.toggleSubMenu}
          classNames={[styles.userAction, styles.afterLogin, 'ant-dropdown-link']}
        >
          <Image
            width={28}
            src={
              className.includes('alt')
                ? '/images/User-Avatar-Onboarding.png'
                : '/images/User-Avatar.png'
            }
          />
          <Container className={styles.text}>
            {(this.state.name || this.state.email) && (
              <Container>
                {this.state.name && (
                  <Container className={styles.headerName}>{this.state.name}</Container>
                )}
                {this.state.email && (
                  <Container className={styles.headerEmail}>{this.state.email}</Container>
                )}
              </Container>
            )}
            {this.props.subLinks && this.props.subLinks.length && (
              <Icon icon={faChevronDown} padding={{ leftRem: 0.5 }} />
            )}
          </Container>
        </Container>
      </Dropdown>
    );
  }

  private getSubMenuDesign() {
    return (
      <Container className={styles.subMenu}>
        {this.props.subLinks!.map((sublink: any, i: number) => (
          <Container
            onClick={sublink.props.href || sublink.props.onClick ? this.hideSubMenu : undefined}
            key={i}
          >
            {sublink}
          </Container>
        ))}
        {/* {Cookies.get('account') && (
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
          )} */}
      </Container>
    );
  }

  private subMenuStatus = (status: any) => {
    if (!status) {
      this.hideSubMenu();
    }
  };

  private hideSubMenu = () => {
    this.setState({
      subMenuVisible: false
    });
  };

  private toggleSubMenu = () => {
    this.setState((prevState): any => {
      if (prevState) {
        return {
          subMenuVisible: !prevState.subMenuVisible
        };
      }
    });
  };
}
