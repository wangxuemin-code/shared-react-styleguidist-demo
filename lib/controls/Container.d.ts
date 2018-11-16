import * as React from 'react';
import { BorderStyleProperty, BorderColorProperty } from 'csstype';
interface IDirectionShort {
    topBottom?: number;
    leftRight?: number;
}
interface IDirection {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}
interface IBorder {
    borderRadius?: number;
    borderColor?: BorderColorProperty;
    borderStyle?: BorderStyleProperty;
    borderSize?: number;
}
export interface IContainer {
    margin?: IDirection & IDirectionShort;
    padding?: IDirection & IDirectionShort;
    positionPoints?: IDirection;
    border?: IBorder;
    children?: any;
    textAlign?: 'left' | 'right' | 'center';
    className?: string;
    lineHeight?: number;
    floatRight?: boolean;
    floatLeft?: boolean;
    clearFix?: boolean;
    widthPercent?: number;
    height?: number;
    backgroundColor?: string;
    display?: 'block' | 'inline-block' | 'inline';
    position?: 'static' | 'absolute' | 'fixed' | 'relative';
    hidden?: boolean;
    tooltip?: string | undefined | null;
    verticalAlign?: 'center';
    zIndex?: number;
}
export declare class Container extends React.Component<IContainer, any> {
    render(): JSX.Element | null;
    private wrapWithTooltipIfNeeded;
}
export {};
