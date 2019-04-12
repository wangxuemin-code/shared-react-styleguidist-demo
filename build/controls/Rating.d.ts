import * as React from 'react';
import { IContainer } from './Container';
interface IRating extends IContainer {
    value?: any;
    variant?: string;
    defaultValue?: number;
    maxValue?: number;
}
interface IState {
    value: number;
}
export declare class Rating extends React.Component<IRating, IState> {
    constructor(props: IRating);
    renderInputs: () => JSX.Element[];
    render(): JSX.Element;
}
export {};