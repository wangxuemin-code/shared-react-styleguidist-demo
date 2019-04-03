import * as React from 'react';
import { IContainer } from './Container';
interface IButton extends IContainer {
    variant?: 'default' | 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger' | 'none';
    outline?: boolean;
    basic?: boolean;
    flat?: boolean;
    type?: 'button' | 'submit';
    onPress?: () => void;
    href?: string;
    disabled?: boolean;
    innerClasses?: string;
    size?: 'medium' | 'large' | 'small';
    loading?: boolean;
}
export declare class Button extends React.Component<IButton, any> {
    static defaultProps: IButton;
    render(): JSX.Element;
    private getButtonDesign;
}
export {};
