import { BorderColorProperty, BorderStyleProperty } from 'csstype';
import * as React from 'react';
import { IContainer } from './Container';
interface IBadge {
    borderSize?: number;
    borderRadius?: number;
    borderColor?: BorderColorProperty;
    borderStyle?: BorderStyleProperty;
    backgroundColor?: string;
    height?: number;
    width?: number;
}
interface IProps extends IContainer {
    icon: any;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    text?: string;
    badge?: IBadge;
    color?: string;
}
export declare class Icon extends React.Component<IProps, any> {
    static defaultProps: IProps;
    constructor(props: IProps);
    render(): JSX.Element;
    private getWrapper;
    private getIconDesign;
    private checkIconType;
}
export {};
