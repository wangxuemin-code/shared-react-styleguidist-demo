import * as React from 'react';
import { IContainer } from './Container';
export interface IText extends IContainer {
    color?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | 'light-bold';
    italic?: boolean;
    letterSpacing?: number;
    textVerticalAlign?: 'sub' | 'top' | 'middle';
}
export declare class Text extends React.Component<IText, any> {
    static defaultProps: IText;
    render(): JSX.Element;
}
