import * as React from 'react';
import { IContainer } from './Container';
interface ILink extends IContainer {
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
    basic?: boolean | string;
    size?: 'small' | 'medium' | 'large';
    href?: string;
    disabled?: boolean;
    useNormalAnchor?: boolean;
    onClick?: () => void;
    float?: 'left' | 'right' | 'none';
}
export declare class Link extends React.Component<ILink, any> {
    static defaultProps: ILink;
    render(): JSX.Element;
}
export {};
