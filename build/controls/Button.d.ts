import * as React from 'react';
import { IContainer } from './Container';
interface IButton extends IContainer {
    buttonStyle?: 'normal' | 'info' | 'invert' | 'none' | 'negative' | 'success' | 'fail';
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
