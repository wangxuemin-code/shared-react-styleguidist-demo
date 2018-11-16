import * as React from 'react';
import { IContainer } from './Container';
export interface IProps extends IContainer {
    danger?: string | string[];
    success?: string | string[];
    info?: string | string[];
}
export declare class Message extends React.Component<IProps, any> {
    render(): JSX.Element | (JSX.Element | null)[] | null;
    private arrayNotEmpty;
    private getMessage;
}
