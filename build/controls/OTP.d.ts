import * as React from 'react';
import { IContainer } from './Container';
interface IOtpInput extends IContainer {
    numInputs: number;
    onChange: Function;
    separator?: string;
    shouldAutoFocus: boolean;
    isInputNum?: boolean;
    inputWidth: string;
    maxLength: number;
}
interface IState {
    activeInput: number;
    otp: string[];
}
export declare class OtpInput extends React.Component<IOtpInput, IState> {
    static defaultProps: IOtpInput;
    constructor(props: IOtpInput);
    getOtp: () => void;
    focusInput: (input: number) => void;
    focusNextInput: () => void;
    focusPrevInput: () => void;
    changeCodeAtFocus: (value: string) => void;
    handleOnChange: (e: any) => void;
    handleOnKeyDown: (e: any) => void;
    renderInputs: () => JSX.Element[];
    render(): JSX.Element;
}
export {};
