import * as React from 'react';
import { IContainer } from './Container';
interface IMessage extends IContainer {
    icon?: any;
    message?: any;
    outline?: boolean;
    variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
}
export declare class Message extends React.Component<IMessage, any> {
    static defaultProps: IMessage;
    render(): JSX.Element;
}
export {};
