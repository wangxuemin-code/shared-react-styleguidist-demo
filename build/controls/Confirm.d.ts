import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    title?: string;
    message: string;
    type: 'yesno' | 'confirm' | 'okonly' | 'error';
    onResult?: (positive: boolean) => void;
}
interface IState {
    show: boolean;
}
export declare class Confirm extends React.Component<IProps, IState> {
    constructor(props: IProps);
    render(): JSX.Element;
    getIcon(): import("@fortawesome/fontawesome-common-types").IconDefinition | undefined;
    onModalHide(): void;
    onPositivePressed(): void;
    onNegativePressed(): void;
    private onExited;
    private static createElementReconfirm;
    static show(props: IProps): void;
}
export {};
