import * as React from 'react';
import { IContainer } from '.';
export interface IAlert extends IContainer {
    error?: string | string[];
    success?: string | string[];
    info?: string | string[];
}
interface IState {
    error?: string | string[];
    success?: string | string[];
    info?: string | string[];
    showing: boolean;
}
export declare class Alert extends React.Component<IAlert, IState> {
    constructor(props: IAlert);
    componentDidUpdate(prevProps: IAlert): void;
    render(): JSX.Element;
    private getContent;
    private arrayNotEmpty;
    private isset;
    private getMessage;
}
export {};
