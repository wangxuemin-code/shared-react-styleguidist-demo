import * as React from 'react';
import { IContainer } from './Container';
interface ILink extends IContainer {
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
    basic?: boolean;
    size?: 'small' | 'medium' | 'large';
    href?: string;
    disabled?: boolean;
    useNormalAnchor?: boolean;
    onClick?: () => void;
}
export declare class Link extends React.Component<ILink, any> {
    static defaultProps: ILink;
    render(): JSX.Element;
}
export {};
