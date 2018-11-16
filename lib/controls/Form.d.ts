import * as React from 'react';
import { IContainer } from './Container';
export interface IFormItem {
    title?: string;
    value?: string | number;
    name?: string;
    type?: 'text' | 'label' | 'number' | 'money' | 'submit';
    placeholder?: string;
    hint?: string;
    inputWidth?: number;
    disabled?: boolean;
    inputAppend?: any;
    onChanged?: (newValue: string | number) => void;
}
interface IProps extends IContainer {
    formItems: IFormItem[];
    labelWidth?: number;
    onSubmit?: (e: React.FormEvent<Form>) => void;
}
export interface IFormData {
    [key: string]: string | number;
}
export declare class Form extends React.Component<IProps> {
    static defaultProps: IProps;
    private inputs;
    render(): JSX.Element;
    getInputValue(name: string): string;
    private initiateFormItemUndefinedProps;
}
export {};
