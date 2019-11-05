import { BorderColorProperty, BorderStyleProperty } from 'csstype';
import * as React from 'react';
import { IContainer } from '.';
interface IBadge {
    borderSize?: number;
    borderRadius?: number;
    borderColor?: BorderColorProperty;
    borderStyle?: BorderStyleProperty;
    backgroundColor?: string;
    height?: number;
    width?: number;
    iconBackground?: boolean;
    fontSize?: number;
    topPx?: number;
    leftPx?: number;
}
interface IProps extends IContainer {
    icon: any;
    variant?: 'primary' | 'secondary' | 'info' | 'disabled' | 'light' | 'dark' | 'success' | 'warning' | 'danger';
    size?: 'tiny' | 'small' | 'medium' | 'large';
    onClick?: () => void;
    text?: string;
    badge?: IBadge;
    flag?: string;
    currency?: string;
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
