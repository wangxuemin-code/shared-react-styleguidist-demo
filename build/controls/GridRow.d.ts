import * as React from 'react';
import { IContainer } from './Container';
interface IGridRow extends IContainer {
}
export declare class GridRow extends React.Component<IGridRow, any> {
    static defaultProps: IGridRow;
    render(): JSX.Element;
}
export {};
