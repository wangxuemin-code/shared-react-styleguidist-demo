import * as React from 'react';
import { IContainer } from '.';
interface IDivider extends IContainer {
    direction?: 'horizontal' | 'vertical';
    size?: number;
    color?: string;
    compact?: boolean;
}
export declare class Divider extends React.Component<IDivider, any> {
    static defaultProps: IDivider;
    render(): JSX.Element;
}
export {};
