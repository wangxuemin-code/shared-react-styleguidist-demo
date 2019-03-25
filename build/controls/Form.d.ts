import * as React from 'react';
import { IAlert } from './Alert';
import { IContainer } from './Container';
import { FormControl } from './FormControl';
interface IProps extends IContainer, IAlert {
    loading?: boolean;
    onSubmit?: () => void;
    horizontal?: boolean;
}
export declare class Form extends React.Component<IProps> {
    formControls: any[];
    constructor(props: IProps);
    render(): JSX.Element;
    private recursiveCloneChildren;
    getInputValue(name: string): string;
    getFormControl(name: string): FormControl;
    getFormData(): FormData;
    reset(): void;
    private _onSubmit;
}
export {};
