import * as React from 'react';
import { IContainer } from '.';
interface IMessage extends IContainer {
    labeled?: boolean;
    icon?: any;
    message?: any;
    flat?: boolean;
    outline?: boolean;
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'light' | 'dark' | 'success' | 'warning' | 'danger' | 'error';
    messageColor?: string;
    size?: 'small' | 'normal';
    title?: any;
    content?: any;
    subContent?: any;
}
export declare class Message extends React.Component<IMessage, any> {
    static defaultProps: IMessage;
    render(): JSX.Element;
}
export {};
