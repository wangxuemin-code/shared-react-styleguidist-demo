import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    error?: string | 'icon-only';
    success?: string | 'icon-only';
    info?: string | 'icon-only';
}
export declare class Message extends React.Component<IProps, any> {
    render(): JSX.Element | null;
}
export {};
