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
interface IHeader extends IContainer {
    fullWidth?: boolean;
    mainLinks?: IMainLink[];
    subLinks?: ISubLink[];
    className?: string;
    logo?: string | boolean;
    userAction?: boolean;
    username?: string;
}
interface IState {
    showSubMenu: boolean;
    username: string;
}
export declare class Header extends React.Component<IHeader, IState> {
    private subMenu?;
    static defaultProps: {
        mainLinks: never[];
        subLinks: never[];
    };
    constructor(props: IHeader);
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IHeader): void;
    handleClick: (e: any) => void;
    toggleClass(): void;
    addDefaultSrc(ev: any): void;
    render(): JSX.Element;
    private getLinkDesign;
    private getUserActionDesign;
    private getUsername;
    private showSubMenu;
    private hideSubMenu;
    private getSubMenuDesign;
}
export {};
