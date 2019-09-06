import * as React from 'react';
import { IContainer } from './Container';
interface IButton extends IContainer {
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'light' | 'dark' | 'success' | 'warning' | 'danger';
    outline?: boolean;
    flat?: boolean;
    type?: 'button' | 'submit';
    onPress?: () => void;
    href?: string;
    disabled?: boolean;
    innerClasses?: string;
    size?: 'tiny' | 'small' | 'medium' | 'large';
    fluid?: boolean;
    loading?: boolean;
    subText?: any;
}
export declare class Button extends React.Component<IButton, any> {
    static defaultProps: IButton;
    render(): JSX.Element;
    private getButtonDesign;
    private getLoadingIconSize;
}
export {};
