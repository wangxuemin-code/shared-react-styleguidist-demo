import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    children?: any;
    label?: boolean | string;
    striped?: boolean;
    animated?: boolean;
    value?: any;
    variant?: string;
    order?: number;
    gap?: boolean;
    compact?: boolean;
}
interface IState {
    value: number;
}
export declare class ProgressBar extends React.Component<IProps, IState> {
    constructor(props: IProps);
    componentDidUpdate(): void;
    render(): JSX.Element;
    private getProgressBarDesign;
}
export {};
