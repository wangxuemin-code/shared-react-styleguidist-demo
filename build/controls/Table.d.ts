import * as React from 'react';
import { IContainer } from './Container';
export interface TableHeaderModel {
    title: string;
}
export interface TableRowModel {
    rowContents: any[];
    rowActions?: TableActionsModel[];
    onClick?: () => void;
}
export interface TableActionsModel {
    icon?: any;
    tooltip?: string;
    callback?: () => void;
    loading?: boolean;
}
interface IProps extends IContainer {
    headers?: TableHeaderModel[];
    rows?: TableRowModel[];
    basic?: boolean;
    callback?: () => void;
}
export declare class Table extends React.Component<IProps, any> {
    render(): JSX.Element;
    private getHeaderDesign;
    private getRowDesign;
    private getActionDesign;
}
export {};
