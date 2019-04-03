import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    success?: string | 'icon-only';
    info?: string | 'icon-only';
    warning?: string | 'icon-only';
    error?: string | 'icon-only';
}
export declare class Message extends React.Component<IProps, any> {
    render(): JSX.Element | null;
}
export {};
