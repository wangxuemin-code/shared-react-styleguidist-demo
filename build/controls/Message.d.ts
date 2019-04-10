import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    icon?: any;
    message?: string;
    variant?: 'info' | 'success' | 'warning' | 'danger';
}
export declare class Message extends React.Component<IProps, any> {
    render(): JSX.Element;
}
export {};
