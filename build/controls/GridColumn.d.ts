import * as React from 'react';
import { IContainer } from '.';
interface IGridColumn extends IContainer {
    col?: number;
}
export declare class GridColumn extends React.Component<IGridColumn, any> {
    static defaultProps: IGridColumn;
    render(): JSX.Element;
}
export {};
