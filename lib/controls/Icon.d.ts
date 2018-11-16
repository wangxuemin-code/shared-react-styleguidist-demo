import * as React from 'react';
import { IContainer } from './Container';
interface IProps extends IContainer {
    iconType?: 'glyphicon' | 'fontawesome';
    fontSize?: number;
    icon: any;
    color?: string;
    onClick?: () => void;
}
export declare class Icon extends React.Component<IProps, any> {
    static defaultProps: IProps;
    render(): JSX.Element;
    private getWrapper;
    private getIconDesign;
}
export {};
