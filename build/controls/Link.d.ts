import * as React from 'react';
import { IContainer } from './Container';
interface ILink extends IContainer {
    href?: string;
    useNormalAnchor?: boolean;
    onClick?: () => void;
}
export declare class Link extends React.Component<ILink, any> {
    render(): JSX.Element;
}
export {};
