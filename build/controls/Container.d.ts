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
    widthPercent?: number;
    height?: number;
    width?: number;
    backgroundColor?: string;
    display?: 'block' | 'inline-block' | 'inline' | 'flex';
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
    style?: React.CSSProperties;
    clamp?: number;
}
export declare class Container extends React.Component<IContainer, any> {
    render(): JSX.Element | null;
    private getContent;
    private wrapWithDotDotIfNeeded;
    private wrapWithTooltip;
}
export {};
