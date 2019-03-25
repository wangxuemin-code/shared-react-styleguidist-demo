import * as React from 'react';
import { IContainer } from './Container';
import { IDateOption } from './DateTimePicker';
import { IAwsSettings } from './FileUploader';
interface IState {
    displayValue?: string;
    value?: string | number | null;
    error?: string;
    showError?: boolean;
}
interface IProps extends IContainer {
    loading?: boolean;
    fullWidth?: boolean;
    defaultValue?: string | number;
    value?: string | number | null;
    placeholder?: string;
    type?: 'text' | 'number' | 'money' | 'static' | 'email' | 'password' | 'select' | 'switch' | 'longtext' | 'datetime' | 'uploader';
    name?: string;
    disabled?: boolean;
    onInputChanged?: (value: string | number, name: string) => void;
    append?: any;
    label?: any;
    required?: boolean;
    validateReturnError?: (value: string | number | undefined | null) => string | undefined;
    selectOptions?: {
        label: string;
        value: string;
    }[];
    extraControls?: any;
    dateOptions?: IDateOption;
    alwaysCapitalize?: boolean;
    s3Settings?: IAwsSettings;
    decimalPlace?: number;
}
export declare class FormControl extends React.Component<IProps, IState> {
    static defaultProps: IProps;
    constructor(props: IProps);
    componentDidUpdate(prevProps: IProps): void;
    render(): JSX.Element;
    getValue(): string;
    getName(): string;
    validate(): boolean;
    reset(): void;
    setValue(value: string | number, notify?: boolean): void;
    toggle(notify?: boolean): void;
    private getControlDesign;
    private onChange;
    private onDateTimeChange;
    private onUploaderChanged;
    private onSwitchChanged;
    private validateValueCanChanged;
    private processValue;
    private onValueChanged;
    private getInputAppendDesign;
}
export {};
