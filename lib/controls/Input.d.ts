import * as React from 'react';
import { IContainer } from './Container';
interface IState {
    displayValue?: string;
    value?: string | number;
}
interface IProps extends IContainer {
    fullWidth?: boolean;
    defaultValue?: string | number;
    placeholder?: string;
    type: 'text' | 'number' | 'money';
    name: string;
    disabled?: boolean;
    onInputChanged?: (value: string | number) => void;
    append?: any;
}
export declare class Input extends React.Component<IProps, IState> {
    constructor(props: IProps);
    componentDidUpdate(prevProps: IProps): void;
    render(): JSX.Element;
    getValue(): string;
    private onChange;
    private processValue;
    private defaultValueChanged;
    private getInputAppendDesign;
}
export {};
