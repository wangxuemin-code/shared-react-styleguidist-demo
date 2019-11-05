import * as React from 'react';
import { IContainer } from '.';
interface IProps extends IContainer {
    type?: 'fade' | 'expand';
    in?: boolean;
    duration?: number;
    finalSize?: {
        width: number;
        height: number;
    };
}
export declare class Transition extends React.Component<IProps> {
    private ref;
    static defaultProps: IProps;
    render(): JSX.Element | undefined;
    private onEnter;
    private onLeave;
}
export {};
