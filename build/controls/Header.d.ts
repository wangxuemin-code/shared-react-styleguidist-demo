import * as React from 'react';
import { IContainer } from './Container';
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
export declare class Header extends React.Component<IHeader, IState> {
    static defaultProps: {
        mainLinks: never[];
        subLinks: never[];
    };
    constructor(props: IHeader);
    componentDidUpdate(prevProps: IHeader): void;
    render(): JSX.Element;
    private getLinkDesign;
    private getNotificationDesign;
    private getNotificationMenuDesign;
    private getSingleNotificationDesign;
    private getNotificationItemDesign;
    private getUserActionDesign;
    private getSubMenuDesign;
    private toggleSubMenu;
}
export {};
