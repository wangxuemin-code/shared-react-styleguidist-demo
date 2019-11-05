import * as React from 'react';
import { GridColumn } from './GridColumn';
import { GridRow } from './GridRow';
import { IContainer } from '.';
interface IGrid extends IContainer {
}
export declare class Grid extends React.Component<IGrid, any> {
    static defaultProps: IGrid;
    static Row: typeof GridRow;
    static Col: typeof GridColumn;
    render(): JSX.Element;
}
export {};
