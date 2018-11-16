import * as React from 'react';
import { IContainer } from './Container';
interface IButton extends IContainer {
    fontSize?: number;
    buttonStyle?: 'one' | 'two' | 'three' | 'dummy';
    type?: 'button' | 'submit';
    onPress?: () => void;
    disabled?: boolean;
}
export declare class Button extends React.Component<IButton, any> {
    static defaultProps: IButton;
    render(): JSX.Element;
}
export {};
