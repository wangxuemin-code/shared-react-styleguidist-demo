import * as React from 'react';
import { IContainer } from './Container';
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
export declare class Header extends React.Component<IHeader, IState> {
    private subMenu?;
    private notificationMenu?;
    static defaultProps: {
        mainLinks: never[];
        subLinks: never[];
    };
    constructor(props: IHeader);
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IHeader): void;
    handleClickNotification: (e: any) => void;
    handleClickSubMenu: (e: any) => void;
    toggleNotification(): void;
    toggleUserAction(): void;
    addDefaultSrc(ev: any): void;
    render(): JSX.Element;
    private getLinkDesign;
    private getNotificationDesign;
    private getNotificationMenuDesign;
    private getSingleNotificationDesign;
    private getNotificationItemDesign;
    private getUserActionDesign;
    private getUsername;
    private getUserEmail;
    private getSubMenuDesign;
}
export {};
