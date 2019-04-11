import * as React from 'react';
import { IContainer } from './Container';
interface IButton extends IContainer {
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'success' | 'warning' | 'danger';
    outline?: boolean;
    basic?: boolean;
    flat?: boolean;
    type?: 'button' | 'submit';
    onPress?: () => void;
    href?: string;
    disabled?: boolean;
    innerClasses?: string;
    size?: 'small' | 'medium' | 'large';
    fluid?: boolean;
    loading?: boolean;
    float?: 'left' | 'right' | 'none';
    subText?: string;
}
export declare class Button extends React.Component<IButton, any> {
    static defaultProps: IButton;
    render(): JSX.Element;
    private getButtonDesign;
}
export {};
