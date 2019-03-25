import * as React from 'react';
import { IContainer } from './Container';
interface IProgressBar extends IContainer {
    value: number;
}
interface IState {
    value: number;
}
export declare class ProgressBar extends React.Component<IProgressBar, IState> {
    constructor(props: IProgressBar);
    componentDidUpdate(): void;
    render(): JSX.Element;
}
export {};
