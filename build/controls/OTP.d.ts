import * as React from 'react';
import { IContainer } from './Container';
interface IOtpInput extends IContainer {
    numInputs: number;
    onChange: Function;
    separator?: any;
    shouldAutoFocus: boolean;
    isInputNum?: boolean;
    inputWidth: string;
    maxLength: number;
    value?: any;
    verificationNumber?: string;
    onSendCode?: (processing: boolean) => void;
    required?: boolean;
}
interface IState {
    activeInput: number;
    otp: string[];
    phoneCode?: string | number;
    phoneNumber?: string | number;
    timeRemainingInSeconds: number;
}
export declare class OtpInput extends React.Component<IOtpInput, IState> {
    private timer;
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
    private sendPhoneCode;
    private decrementTimeRemaining;
}
export {};
