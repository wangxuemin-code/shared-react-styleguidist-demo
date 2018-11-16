import * as React from 'react';
import { IText } from '.';
interface ILink extends IText {
    href?: string;
    onClick?: () => void;
}
export declare class Link extends React.Component<ILink, any> {
    render(): JSX.Element | undefined;
}
export {};
