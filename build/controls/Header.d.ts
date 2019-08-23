import * as React from 'react';
import { IContainer } from './Container';
interface IMainLink {
    title: string;
    path: string;
    selected?: boolean;
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
    subLinks?: any;
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
}
export declare class Header extends React.Component<IHeader, IState> {
    static defaultProps: {
        mainLinks: never[];
        subLinks: never[];
    };
    constructor(props: IHeader);
    componentDidUpdate(prevProps: IHeader): void;
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
