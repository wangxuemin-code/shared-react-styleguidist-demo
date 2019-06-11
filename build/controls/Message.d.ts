import * as React from 'react';
import { IContainer } from './Container';
interface IMessage extends IContainer {
    icon?: any;
    message?: any;
    flat?: boolean;
    outline?: boolean;
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
    messageColor?: string;
}
export declare class Message extends React.Component<IMessage, any> {
    static defaultProps: IMessage;
    render(): JSX.Element;
}
export {};
