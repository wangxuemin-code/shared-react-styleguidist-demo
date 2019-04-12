import * as React from 'react';
import { IContainer } from './Container';
import { GridColumn } from './GridColumn';
import { GridRow } from './GridRow';
interface IGrid extends IContainer {
}
export declare class Grid extends React.Component<IGrid, any> {
    static defaultProps: IGrid;
    static Row: typeof GridRow;
    static Col: typeof GridColumn;
    render(): JSX.Element;
}
export {};
