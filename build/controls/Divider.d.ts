import * as React from 'react';
import { IContainer } from './Container';
interface IDivider extends IContainer {
    direction?: 'horizontal' | 'vertical';
    size?: number;
    color?: string;
}
export declare class Divider extends React.Component<IDivider, any> {
    static defaultProps: IDivider;
    render(): JSX.Element;
}
export {};
