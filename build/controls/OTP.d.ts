import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    numInputs: number;
    onChange: Function;
    separator?: any;
    autoFocus: boolean;
    isInputNum?: boolean;
    inputWidth: string;
    maxLength: number;
    value?: any;
    verificationNumber?: string;
    onSendCode?: (processing: boolean) => void;
    required?: boolean;
    loading?: boolean;
}
interface IState {
    activeInput: number;
    otp: string[];
    phoneCode?: string | number;
    phoneNumber?: string | number;
    timeRemainingInSeconds: number;
    firstSendCode?: boolean;
}
export declare class OtpInput extends React.Component<IProps, IState> {
    private timer;
    private activeInput;
    static defaultProps: IProps;
    constructor(props: IProps);
    componentDidUpdate(prevProps: IProps): void;
    getOtp: () => void;
    focusInput: (input: number) => void;
    focusNextInput: (input?: number | undefined) => void;
    focusPrevInput: (input?: number | undefined) => void;
    changeCodeAtFocus: (value: string, input?: number | undefined) => void;
    handleOnChange: (e: any) => void;
    handleOnKeyDown: (e: any, i: number) => void;
    renderInputs: () => JSX.Element[];
    render(): JSX.Element;
    private sendPhoneCode;
    private decrementTimeRemaining;
}
export {};
