import * as React from 'react';
import { IContainer } from './Container';
interface IProgressBar extends IContainer {
    children?: any;
    label?: boolean | string;
    striped?: boolean;
    animated?: boolean;
    value?: any;
    variant?: string;
    order?: number;
    gap?: boolean;
}
interface IState {
    value: number;
}
export declare class ProgressBar extends React.Component<IProgressBar, IState> {
    constructor(props: IProgressBar);
    componentDidUpdate(): void;
    render(): JSX.Element;
    private getProgressBarDesign;
}
export {};
