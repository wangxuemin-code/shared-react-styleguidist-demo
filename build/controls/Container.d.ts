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
    textAlign?: 'left' | 'right' | 'center' | 'justify';
    className?: string;
    classNames?: string[];
    lineHeight?: number;
    clearFix?: boolean;
    heightPercent?: number;
    widthPercent?: number;
    height?: number;
    width?: number;
    fluid?: boolean;
    backgroundColor?: string;
    backgroundImage?: string;
    backgroundPosition?: 'center' | 'bottom' | 'left' | 'right' | 'top' | 'initial' | 'inherit';
    backgroundSize?: 'auto' | 'contain' | 'cover' | 'inherit' | 'initial';
    backgroundRepeat?: 'no-repeat' | 'initial' | 'inherit' | 'repeat' | 'repeat-x' | 'repeat-y';
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
    overflow?: 'hidden' | 'auto';
}
export declare class Container extends React.Component<IContainer, any> {
    render(): JSX.Element | null;
    private getContent;
    private wrapWithDotDotIfNeeded;
    private wrapWithTooltip;
}
export {};
