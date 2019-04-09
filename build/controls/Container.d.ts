import { BorderColorProperty, BorderStyleProperty, FontWeightProperty } from 'csstype';
import * as React from 'react';
import { MouseEventHandler } from 'react';
import { IAllDirection, IDirection, IDirectionShort } from './common/interfaces';
interface IBorder {
    borderRadius?: number;
    borderColor?: BorderColorProperty;
    borderStyle?: BorderStyleProperty;
    borderSize?: number;
}
export interface IContainer {
    margin?: IDirection & IDirectionShort & IAllDirection;
    padding?: IDirection & IDirectionShort & IAllDirection;
    positionPoints?: IDirection;
    border?: IBorder;
    children?: any;
    textAlign?: 'left' | 'right' | 'center';
    className?: string;
    classNames?: string[];
    lineHeight?: number;
    clearFix?: boolean;
    heightPercent?: number;
    widthPercent?: number;
    height?: number;
    width?: number;
    backgroundColor?: string;
    display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'grid' | 'inline-grid' | 'inline-flex';
    position?: 'static' | 'absolute' | 'fixed' | 'relative';
    visibility?: 'hidden' | 'visible';
    hidden?: boolean;
    tooltip?: any;
    verticalAlign?: 'center';
    zIndex?: number;
    fontStyle?: 'normal' | 'italic';
    fontColor?: string;
    fontWeight?: FontWeightProperty;
    float?: 'left' | 'right' | 'none';
    textVerticalAlign?: 'sub' | 'top' | 'middle';
    letterSpacing?: number;
    fontSizePx?: number;
    fontSizeRem?: number;
    onMouseEnter?: MouseEventHandler;
    onMouseLeave?: MouseEventHandler;
    onClick?: MouseEventHandler;
    style?: React.CSSProperties;
    variant?: any;
    clamp?: number;
    focus?: boolean;
    alignItems?: 'baseline' | 'center' | 'start' | 'end' | 'stretch';
    justifyContent?: 'baseline' | 'center' | 'start' | 'end' | 'left' | 'right' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
    equalWidth?: boolean;
}
export declare class Container extends React.Component<IContainer, any> {
    render(): JSX.Element | null;
    private getContent;
    private wrapWithDotDotIfNeeded;
    private wrapWithTooltip;
}
export {};
